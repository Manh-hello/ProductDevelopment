# Nhận diện chữ viết (model HanziCNN)

## Model đã xác minh
Nguồn: gói `dev_model` (đã đặt trong `handwriting-service/model/`).

| File | Vai trò |
|---|---|
| `model.pt` | Trọng số (`state_dict`) của `HanziCNN`, ~11 MB |
| `config.json` | `width=48`, `dropout=0.3`, `img_size=64`, `mean`, `std` dùng chuẩn hoá |
| `classes.json` | **347 chữ Hán** model nhận diện được (list ký tự, thứ tự = chỉ số lớp) |
| `model_def.py` | Kiến trúc CNN 4 khối Conv-BN-ReLU + GAP + Linear |
| `preprocess.py` | Ảnh bất kỳ → xám, tự đảo nền tối, cắt khung quanh nét chữ, căn giữa, resize 64×64 |
| `inference_core.py` | `Recognizer(model_dir, device=None, threshold=0.5).predict(img, topk=3)` → `{label, confidence, accepted, topk}` |

Đặc điểm cần biết:
- **Một chữ mỗi ảnh.** Từ nhiều chữ (vd 学校) phải gửi từng chữ riêng. API trả `match.targetChars` / `unsupportedChars` để giao diện nói rõ chữ nào model không hỗ trợ.
- **Chỉ 347 chữ.** Chữ ngoài tập này luôn bị đoán thành một chữ khác → `match.unsupportedChars` cảnh báo.
- **Không có phân tích lỗi nét / thứ tự nét / gợi ý sửa.** Vì vậy API **không** trả các thông tin này (`analysis: null`).
- Ảnh trống: `preprocess` trả mảng 0 nhưng softmax vẫn chọn một lớp → dịch vụ Python **chặn trước** và trả `blank: true`; API trả `status: "no_content"`.
- Độ tin cậy là xác suất softmax của lớp đứng đầu; ngưỡng "tin cậy thấp" do backend quyết định bằng `HANDWRITING_MIN_CONFIDENCE` (mặc định 0.5).

## Kiến trúc
```
Frontend (canvas PNG / ảnh tải lên)
  → POST /api/handwriting/recognize  (JWT, rate limit 20/phút, ảnh thô ≤ 2 MB)
  → adapter httpRecognizer           (backend/src/services/handwriting/)
  → handwriting-service (FastAPI, PyTorch) → Recognizer.predict
```
Thay model sau này: giữ nguyên route/controller/service, viết adapter mới thoả interface `HandwritingRecognizer` (`services/handwriting/types.ts`) và đổi `getRecognizer()` trong `services/handwriting/index.ts`.

## Cài đặt & chạy local
Yêu cầu: Python 3.10+ (model được lưu bằng Python 3.13 nhưng chỉ cần PyTorch ≥ 2.2 đọc được `state_dict`), ~1 GB RAM. CPU là đủ; có CUDA thì tự dùng.
```bash
cd handwriting-service
python -m venv .venv
.venv\Scripts\activate            # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8001
```
Kiểm tra: `curl http://127.0.0.1:8001/health` → `{"status":"ok","classes":347,...}`.

Biến môi trường của dịch vụ Python (đều tuỳ chọn): `HANDWRITING_MODEL_DIR` (mặc định `./model`; đổi để trỏ tới thư mục model khác), `HANDWRITING_SERVICE_TOKEN`, `HANDWRITING_MAX_IMAGE_BYTES` (2000000), `HANDWRITING_THRESHOLD` (0.5), `HANDWRITING_CLEANUP` (`auto`|`on`|`off`, xem mục ảnh chụp).

Cấu hình backend (`backend/.env`):
```
HANDWRITING_SERVICE_URL=http://127.0.0.1:8001
HANDWRITING_SERVICE_TOKEN=            # trùng với dịch vụ Python nếu đã đặt
HANDWRITING_TIMEOUT_MS=8000
HANDWRITING_MIN_CONFIDENCE=0.5
HANDWRITING_MAX_IMAGE_BYTES=2000000
```
Cho dịch vụ Python chỉ lắng nghe `127.0.0.1` hoặc mạng nội bộ và đặt `HANDWRITING_SERVICE_TOKEN` khi chạy khác máy; **không** mở cổng này ra Internet.

## Ảnh chụp bằng điện thoại (nền xám, giấy ô ly, bóng đổ)
Model được huấn luyện trên nét chữ sạch, nền trắng tinh. `preprocess.py` coi mọi pixel tối hơn ngưỡng 0.25 là "mực" (xám < 191/255). **Camera thu giấy trắng ở mức xám ~150-200 dù mắt thấy "trắng"**, nên cả tờ giấy thành "mực", khung cắt bao toàn ảnh và model nhận một hình chữ nhật xám thay vì một chữ. Đo thực tế: ảnh chữ 对 chụp trên giấy trắng có 99,8% pixel bị coi là mực; chưa làm sạch model đoán 四 (20,5%), sau làm sạch model đoán 对 (96,0%).

`handwriting-service/photo_cleanup.py` xử lý trước khi gọi model (không sửa `preprocess.py` hay model): chia phẳng nền/bóng đổ, ngưỡng Otsu, **gỡ đường kẻ ô ly** (cho phép nghiêng ±6° và đứt quãng), bỏ đốm nhiễu, giữ cụm nét của chữ (chữ nhiều mảnh rời như 又+寸 được giữ đủ), xử lý cả nền tối. Phản hồi của dịch vụ có thêm `cleanup: true|false`.

**Khi nào chạy** (`HANDWRITING_CLEANUP=auto`): khi nền không đủ trắng (độ sáng trung vị của nền < 235) **hoặc** không đồng đều. Ảnh canvas/ảnh quét sạch (nền 255) được giữ nguyên. `on` = luôn chạy, `off` = không chạy.

Mô phỏng 100 chữ in (Noto Sans) bị làm giống ảnh chụp, top-1 của model: giấy xám đều 14 → 100; xám + bóng đổ 15 → 100; + ô ly 9 → 100; + mờ + nghiêng 3° 8 → 100; chữ in sạch 100 (không kích hoạt). Đây là chữ in giả lập nên **lạc quan hơn chữ viết tay thật**; chỉ chứng minh ảnh nền xám phá hỏng nhận diện và việc làm sạch không làm hại ảnh tốt.

Giới hạn: heuristic. Nét bút mảnh bằng độ dày đường kẻ, chữ chạm mép khung, ảnh quá mờ/tối, nhiều chữ trong một ảnh, hoặc chữ viết sai cấu trúc (vd 又 xếp trên 寸 thay vì 又 bên trái 寸 bên phải) vẫn cho kết quả sai. Để ổn định: chụp thẳng góc, đủ sáng, một chữ lớn, nét đậm, hoặc dùng khung vẽ trên web. Khi huấn luyện lại nên thêm augmentation mô phỏng ảnh chụp (nền xám, làm mờ, đổi độ dày nét, đường kẻ).

## Hợp đồng HTTP của dịch vụ model
| Endpoint | Mô tả |
|---|---|
| `GET /health` | `{ status, classes, device }` |
| `GET /classes` | `{ classes: [...] }` |
| `POST /recognize` | Body = bytes PNG/JPEG/WebP. 200 `{ blank, label?, confidence?, accepted?, topk: [{label, confidence}] }`; 400 ảnh không đọc được; 413 quá lớn; 401 sai token |

## Thử API đầu-cuối
```bash
TOKEN=$(curl -s -X POST localhost:5000/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"..."}' | python -c "import sys,json;print(json.load(sys.stdin)['data']['token'])")
curl -s localhost:5000/api/handwriting/status -H "Authorization: Bearer $TOKEN"
curl -s -X POST localhost:5000/api/handwriting/recognize -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: image/png" --data-binary @chu_viet.png
```
Ảnh nên là một chữ đậm, nền sáng (nền tối cũng được vì `preprocess` tự đảo). Giao diện web xuất canvas thành PNG 360×260, nét đen trên nền trắng.

## Quyền riêng tư & dữ liệu
Ảnh chỉ nằm trong bộ nhớ trong lúc xử lý: không ghi đĩa, không lưu DB, không log. DB chỉ lưu `handwriting_attempts` (trạng thái, chữ dự đoán, độ tin cậy, `matches_target`). Không có dữ liệu tạm cần dọn.

## Giới hạn
- Chỉ nhận diện, **không chấm đúng/sai nét** hay thứ tự nét; kết quả chỉ để tham khảo và **không** thay đổi `quality`/XP/SRS của bài luyện viết (người học vẫn tự đánh giá).
- Độ chính xác phụ thuộc chất lượng dữ liệu train; chữ viết thảo/nét quá mảnh có thể cho độ tin cậy thấp.
- Rate limit và bộ đếm nằm trong RAM của một tiến trình backend.

## Lỗi thường gặp
| Hiện tượng | Nguyên nhân / cách xử lý |
|---|---|
| `/handwriting/status` → `configured:false` | Chưa đặt `HANDWRITING_SERVICE_URL` |
| `configured:true`, `available:false` | Dịch vụ Python chưa chạy / sai URL / sai token (401) |
| `ModuleNotFoundError: model_def` khi chạy dịch vụ | `HANDWRITING_MODEL_DIR` sai hoặc thiếu `model_def.py`/`preprocess.py` |
| `RuntimeError ... size mismatch` khi nạp model | `config.json`/`classes.json` không cùng bộ với `model.pt` |
| `Weights only load failed` | PyTorch mới yêu cầu `weights_only`; file hiện tại là `state_dict` nên hợp lệ — nâng/hạ PyTorch trong khoảng `>=2.2` nếu gặp lỗi lạ |
| Luôn `low_confidence` | Viết nhỏ/mảnh/nhiều chữ trong một ảnh; chữ nằm ngoài tập lớp (xem `match.unsupportedChars`); ảnh chụp giấy ô ly/nền xám (xem mục ảnh chụp) |
| `ModuleNotFoundError: scipy` | Chạy lại `pip install -r requirements.txt` trong `handwriting-service` |

## Huấn luyện lại và thay model từ notebook `03_CNN_chu_Han_3755_viet_tay.ipynb`
Notebook xuất thư mục `dev_model/` gồm `model.pt`, `config.json`, `classes.json`, `model_def.py`, `preprocess.py`, `inference_core.py`, `photo_cleanup.py`, `calibration.json`.
1. Chép **toàn bộ** thư mục này đè lên `handwriting-service/model/` (giữ đồng bộ cả `model_def.py`/`preprocess.py` với `model.pt`, vì kiến trúc và `img_size` có thể đổi) rồi khởi động lại dịch vụ Python. `photo_cleanup.py` trong thư mục model được ưu tiên hơn bản ở thư mục dịch vụ (đúng mã đã dùng khi đánh giá).
2. `config.json` mới có thêm `arch`, `temperature` (hiệu chuẩn trên VAL) và `threshold`. Dịch vụ tự dùng chúng; `HANDWRITING_THRESHOLD` chỉ cần đặt khi muốn ghi đè.
3. Đặt `HANDWRITING_MIN_CONFIDENCE` ở **backend** gần bằng `threshold` trong `calibration.json`. Ngưỡng này chọn trên ảnh HWDB nên có thể quá lạc quan với ảnh người học; hãy đối chiếu với kết quả Cell 15b của notebook rồi nâng nếu cần.
4. Model mới có nhiều lớp hơn thì `classes.json` thay đổi: backend tự đọc qua `/classes`, không cần sửa mã.

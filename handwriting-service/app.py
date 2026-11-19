"""
Dịch vụ HTTP bọc model nhận diện chữ Hán (HanziCNN) để backend Node gọi qua adapter `httpRecognizer`.

Chạy:  uvicorn app:app --host 127.0.0.1 --port 8001
Cấu hình (biến môi trường):
  HANDWRITING_MODEL_DIR      thư mục chứa model.pt, config.json, classes.json, model_def.py, preprocess.py, inference_core.py
                             (mặc định: ./model)
  HANDWRITING_SERVICE_TOKEN  nếu đặt, mọi request phải kèm `Authorization: Bearer <token>` (backend gửi từ cùng biến này)
  HANDWRITING_MAX_IMAGE_BYTES  giới hạn kích thước ảnh (mặc định 2000000)
  HANDWRITING_THRESHOLD      ngưỡng `accepted` của Recognizer (bỏ trống = lấy từ config.json của model mới, hoặc 0.5 với model cũ; backend tự quyết định theo HANDWRITING_MIN_CONFIDENCE)
  HANDWRITING_CLEANUP        auto (mặc định) | on | off. Làm sạch ẢNH CHỤP (nền giấy xám, ô ly, bóng đổ) trước khi nhận diện;
                             "auto" làm khi nền không đủ trắng hoặc không đồng đều; ảnh canvas/ảnh quét sạch (nền 255) được giữ nguyên (xem photo_cleanup.py)

Dịch vụ KHÔNG ghi ảnh ra đĩa, không log nội dung ảnh. Chỉ nên lắng nghe trên 127.0.0.1 / mạng nội bộ.
"""
import hmac
import io
import os
import sys

from fastapi import FastAPI, Header, HTTPException, Request
from PIL import Image, UnidentifiedImageError

MODEL_DIR = os.path.abspath(os.environ.get("HANDWRITING_MODEL_DIR", os.path.join(os.path.dirname(__file__), "model")))
sys.path.insert(0, MODEL_DIR)  # inference_core import `model_def` và `preprocess` theo tên module

from inference_core import Recognizer  # noqa: E402
from preprocess import load_ink  # noqa: E402
from photo_cleanup import clean_photo, needs_cleanup  # noqa: E402

TOKEN = os.environ.get("HANDWRITING_SERVICE_TOKEN") or None
MAX_BYTES = int(os.environ.get("HANDWRITING_MAX_IMAGE_BYTES", "2000000"))
# Không đặt = dùng ngưỡng ĐÃ HIỆU CHUẨN trong config.json của model mới (model cũ không có thì mặc định 0.5). Đặt = ghi đè.
_thr = os.environ.get("HANDWRITING_THRESHOLD", "").strip()
THRESHOLD = float(_thr) if _thr else None
INK_THRESHOLD = 0.25  # cùng ngưỡng `thr` mặc định trong preprocess.preprocess
ALLOWED_FORMATS = {"PNG", "JPEG", "WEBP"}
CLEANUP_MODE = os.environ.get("HANDWRITING_CLEANUP", "auto").strip().lower()

Image.MAX_IMAGE_PIXELS = 25_000_000  # chặn "decompression bomb"

recognizer = Recognizer(MODEL_DIR, **({"threshold": THRESHOLD} if THRESHOLD is not None else {}))
app = FastAPI(title="Hanzi handwriting recognition", docs_url=None, redoc_url=None)


def _check_auth(authorization):
    if TOKEN is None:
        return
    expected = f"Bearer {TOKEN}"
    if not authorization or not hmac.compare_digest(authorization.encode(), expected.encode()):
        raise HTTPException(status_code=401, detail="unauthorized")


@app.get("/health")
def health(authorization: str = Header(default=None)):
    _check_auth(authorization)
    return {"status": "ok", "classes": len(recognizer.classes), "device": str(recognizer.device)}


@app.get("/classes")
def classes(authorization: str = Header(default=None)):
    _check_auth(authorization)
    return {"classes": recognizer.classes}


@app.post("/recognize")
async def recognize(request: Request, authorization: str = Header(default=None)):
    _check_auth(authorization)

    declared = request.headers.get("content-length")
    if declared and declared.isdigit() and int(declared) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="image too large")
    data = await request.body()
    if not data:
        raise HTTPException(status_code=400, detail="empty body")
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="image too large")

    try:
        img = Image.open(io.BytesIO(data))
        if img.format not in ALLOWED_FORMATS:
            raise HTTPException(status_code=400, detail="unsupported image format")
        img.load()
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError):
        raise HTTPException(status_code=400, detail="invalid image")

    # Ảnh chụp (giấy, ô ly, bóng): preprocess() coi cả tờ giấy xám là "mực" nên model nhận một hình chữ nhật xám.
    # Đưa về nét chữ sạch trên nền trắng trước. Ảnh vốn sạch (canvas) giữ nguyên.
    cleaned = False
    if CLEANUP_MODE != "off":
        try:
            if max(img.size) > 1024:
                img.thumbnail((1024, 1024))
            if CLEANUP_MODE == "on" or needs_cleanup(img):
                img, found = clean_photo(img)
                cleaned = True
                if not found:
                    return {"blank": True, "topk": [], "cleanup": True}
        except Exception as e:  # không để lỗi làm sạch chặn nhận diện: dùng ảnh gốc
            print("[cleanup] bỏ qua do lỗi:", type(e).__name__)

    # Ảnh trống: preprocess() trả mảng 0 và softmax vẫn chọn một lớp bất kỳ -> phải chặn trước khi gọi model.
    if not (load_ink(img) > INK_THRESHOLD).any():
        return {"blank": True, "topk": [], "cleanup": cleaned}

    out = recognizer.predict(img, topk=5)
    return {"blank": False, "label": out["label"], "confidence": out["confidence"], "accepted": out["accepted"], "topk": out["topk"], "cleanup": cleaned}

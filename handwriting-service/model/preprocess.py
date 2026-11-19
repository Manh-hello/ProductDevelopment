
import numpy as np
from PIL import Image
IMG_SIZE = 64  # Kích thước ảnh chuẩn hóa đầu vào cho mô hình CNN

def load_ink(img):
    # Chuyển đổi các định dạng ảnh có kênh alpha (trong suốt) sang RGBA để xử lý nền trắng
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255)) # Tạo nền trắng
        img = Image.alpha_composite(bg, img) # Đè ảnh lên nền trắng

    # Chuyển ảnh về dạng GrayScale (L) và đưa về mảng numpy float32
    a = np.asarray(img.convert("L"), dtype=np.float32)

    # Kiểm tra màu đường viền để xác định xem ảnh là nền sáng hay nền tối
    border = np.concatenate([a[0, :], a[-1, :], a[:, 0], a[:, -1]]).mean()
    if border < 128:
        a = 255.0 - a  # Đảo ảnh nếu là nền tối để thống nhất nền sáng nét chữ đen

    # Trả về mảng chuẩn hóa: nét chữ (mực) có giá trị gần 1.0, nền có giá trị gần 0.0
    return (255.0 - a) / 255.0

def preprocess(img, size=IMG_SIZE, margin=0.12, thr=0.25):
    # Đọc mức độ phân bố mực của chữ
    ink = load_ink(img)

    # Xác định các điểm pixel có mực vượt ngưỡng để xác định khung chứa chữ (Bounding Box)
    ys, xs = np.where(ink > thr)
    if len(ys) == 0: # Nếu ảnh trống không có nét chữ
        return np.zeros((1, size, size), dtype=np.float32)

    # Tìm biên giới hạn nét chữ
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    h, w = y1 - y0, x1 - x0

    # Tính kích thước khung vuông mới kèm theo khoảng đệm (margin) tránh mất nét ở rìa
    side = int(round(max(h, w) * (1 + 2 * margin)))
    canvas = np.zeros((side, side), dtype=np.float32) # Tạo khung vuông đen trống

    # Căn chữ vào chính giữa khung vuông mới
    oy, ox = (side - h) // 2, (side - w) // 2
    canvas[oy:oy + h, ox:ox + w] = ink[y0:y1, x0:x1]

    # Resize ảnh về kích thước chuẩn 64x64 và đưa về dạng mảng 1 kênh (1, 64, 64)
    im = Image.fromarray((canvas * 255).astype(np.uint8)).resize((size, size), Image.BILINEAR)
    return (np.asarray(im, dtype=np.float32) / 255.0)[None]

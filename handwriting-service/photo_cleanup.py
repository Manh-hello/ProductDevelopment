"""
Làm sạch ẢNH CHỤP (giấy ô ly, bóng đổ, nền xám) trước khi đưa vào model.

Vì sao cần: `preprocess.preprocess` coi mọi pixel tối hơn ngưỡng 0.25 là "mực". Ảnh chụp có nền giấy xám
(~150/255) nên CẢ TỜ GIẤY thành "mực": khung cắt bao toàn ảnh và model nhận một hình chữ nhật xám thay vì một chữ.
Model được huấn luyện trên nét chữ sạch trên nền trắng, nên ảnh phải được đưa về dạng đó.

Không sửa model / preprocess.py. Ảnh vốn đã sạch (vd PNG vẽ từ canvas: nền trắng tinh, đều) được GIỮ NGUYÊN (`needs_cleanup`).
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

MAX_SIDE = 512  # thu nhỏ ảnh lớn để xử lý nhanh; hình dạng nét vẫn đủ cho model 64x64


def _to_gray(img: Image.Image) -> np.ndarray:
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
        img = Image.alpha_composite(bg, img)
    a = np.asarray(img.convert("L"), dtype=np.float32)
    border = np.concatenate([a[0, :], a[-1, :], a[:, 0], a[:, -1]]).mean()
    return 255.0 - a if border < 128 else a      # nền tối (phấn trên bảng) -> đưa về nét tối trên nền sáng, như load_ink


def needs_cleanup(img: Image.Image) -> bool:
    """
    Ảnh chụp -> True. Ảnh sạch (canvas, ảnh quét: nền trắng tinh, đều) -> False.
    Camera thu giấy trắng ở mức xám (~150-200/255) dù mắt thấy "trắng"; preprocess.py coi pixel > 0.25 mực (xám < 191)
    là mực nên cả tờ giấy thành mực. Vì vậy phải xét cả ĐỘ SÁNG nền, không chỉ độ đồng đều.
    """
    a = _to_gray(img)
    bright = a[a > np.percentile(a, 30)]
    if bright.size == 0:
        return False
    return bool(np.median(bright) < 235 or bright.std() > 12)


def _otsu(x: np.ndarray) -> float:
    hist, edges = np.histogram(x, bins=128)
    hist = hist.astype(np.float64)
    w0 = np.cumsum(hist); w1 = hist.sum() - w0
    m = np.cumsum(hist * (edges[:-1] + edges[1:]) / 2)
    mu0 = m / np.maximum(w0, 1); mu1 = (m[-1] - m) / np.maximum(w1, 1)
    between = w0 * w1 * (mu0 - mu1) ** 2
    return float(edges[int(np.argmax(between)) + 1])


def _long_lines(mask: np.ndarray, frac: float = 0.85, max_angle: int = 6) -> np.ndarray:
    """Đường thẳng dài (>= frac chiều ảnh), ngang hoặc dọc, cho phép nghiêng tới max_angle độ (chụp tay) và đứt quãng nhỏ (ảnh mờ)."""
    h, w = mask.shape
    out = np.zeros((h, w), dtype=bool)
    for transpose in (False, True):
        m = ndi.binary_dilation(mask.T if transpose else mask, iterations=1).astype(np.uint8)  # làm dày đường mảnh để chịu độ nghiêng
        L = int(frac * m.shape[1])
        if L < 15:
            continue
        gap = max(3, int(0.06 * L))
        acc = np.zeros(m.shape, dtype=bool)
        for ang in range(-max_angle, max_angle + 1, 2):
            r = ndi.rotate(m, ang, reshape=True, order=0)
            r = ndi.minimum_filter1d(ndi.maximum_filter1d(r, size=gap, axis=1), size=gap, axis=1)   # nối khe nhỏ dọc đường
            r = ndi.maximum_filter1d(ndi.minimum_filter1d(r, size=L, axis=1), size=L, axis=1)       # chỉ giữ đoạn thẳng dài >= L
            r = ndi.rotate(r, -ang, reshape=True, order=0)
            oy, ox = (r.shape[0] - m.shape[0]) // 2, (r.shape[1] - m.shape[1]) // 2
            acc |= r[oy:oy + m.shape[0], ox:ox + m.shape[1]].astype(bool)
        out |= acc.T if transpose else acc
    return ndi.binary_dilation(out, iterations=2)


def clean_photo(img: Image.Image):
    """
    Trả về (ảnh PIL 'L' nền trắng - nét đen, tìm_thấy_chữ: bool).
    1) ước lượng nền giấy bằng closing (xoá nét tối hẹp) rồi làm mượt -> chia phẳng bóng/độ sáng;
    2) ngưỡng Otsu trên độ tối so với nền; 3) bỏ đường kẻ ô ly (thành phần mảnh chạy suốt ảnh) và đốm nhiễu;
    4) giữ cụm nét quanh thành phần lớn nhất (vùng rộng 60% kích thước của nó mỗi phía) (chữ có thể gồm vài mảnh rời, vd 又 + 寸).
    """
    a = _to_gray(img)
    h0, w0 = a.shape
    if max(h0, w0) > MAX_SIDE:
        s = MAX_SIDE / max(h0, w0)
        a = np.asarray(Image.fromarray(a.astype(np.uint8)).resize((max(1, round(w0 * s)), max(1, round(h0 * s))), Image.LANCZOS), dtype=np.float32)
    h, w = a.shape

    k = max(7, int(0.15 * min(h, w)) | 1)
    bg = ndi.minimum_filter(ndi.maximum_filter(a, size=k), size=k)  # closing: nền giấy không có nét tối hẹp
    bg = ndi.gaussian_filter(bg, sigma=k / 4)
    diff = np.clip(bg - a, 0, None)                                   # độ tối của nét so với nền cục bộ
    if diff.max() < 15:                                               # gần như không có gì tối hơn nền
        return Image.new("L", (w, h), 255), False

    mask = diff > max(_otsu(diff), 0.25 * float(np.percentile(diff, 99.5)))
    # Gỡ đường kẻ ô ly (đường dài chạy suốt ảnh). Không còn nét nào sau khi gỡ = giấy trống.
    nolines = mask & ~_long_lines(mask)
    if nolines.sum() < max(30, 0.0015 * h * w):
        return Image.new("L", (w, h), 255), False
    mask = ndi.binary_dilation(nolines, iterations=1)   # nối lại chỗ nét bị cắt khi giao với đường kẻ
    lab, n = ndi.label(mask, structure=np.ones((3, 3)))
    if n == 0:
        return Image.new("L", (w, h), 255), False

    objs = ndi.find_objects(lab)
    areas = ndi.sum(mask, lab, index=np.arange(1, n + 1))
    keep = []
    for i, sl in enumerate(objs):
        bh, bw = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        line_like = (bw >= 0.9 * w and bh <= 0.12 * h) or (bh >= 0.9 * h and bw <= 0.12 * w)  # đường kẻ ô ly
        if not line_like and areas[i] >= 6:
            keep.append(i)
    if not keep:
        return Image.new("L", (w, h), 255), False

    main = max(keep, key=lambda i: areas[i])
    if areas[main] < 0.004 * h * w:                      # chỉ còn vệt/bụi nhỏ, không phải chữ
        return Image.new("L", (w, h), 255), False
    sl = objs[main]
    mh, mw = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
    pad = 0.6 * max(mh, mw)
    y0, y1, x0, x1 = sl[0].start - pad, sl[0].stop + pad, sl[1].start - pad, sl[1].stop + pad

    def _is_border(s):
        return s[0].start <= 0 or s[1].start <= 0 or s[0].stop >= h or s[1].stop >= w

    # Mảnh LỚN (>= 8% mảnh chính) nằm trong vùng quanh mảnh chính: các phần của chữ (vd 又 và 寸 là hai mảnh rời).
    big = [main]
    for i in keep:
        s = objs[i]
        cy, cx = (s[0].start + s[0].stop) / 2, (s[1].start + s[1].stop) / 2
        if i != main and areas[i] >= 0.08 * areas[main] and not _is_border(s) and y0 <= cy <= y1 and x0 <= cx <= x1:
            big.append(i)
    uy0 = min(objs[i][0].start for i in big); uy1 = max(objs[i][0].stop for i in big)
    ux0 = min(objs[i][1].start for i in big); ux1 = max(objs[i][1].stop for i in big)
    m = 0.08 * max(uy1 - uy0, ux1 - ux0)
    final = [i + 1 for i in big]
    # Mảnh NHỎ (chấm, nét ngắn) chỉ giữ khi nằm sát cụm chữ; đốm nhiễu ở xa (vệt đường kẻ đỏ, bụi) bị bỏ.
    for i in keep:
        s = objs[i]
        if i in big or areas[i] < 0.015 * areas[main] or _is_border(s):
            continue
        if s[0].start >= uy0 - m and s[0].stop <= uy1 + m and s[1].start >= ux0 - m and s[1].stop <= ux1 + m:
            final.append(i + 1)
    keep_mask = np.isin(lab, final)
    keep_mask = ndi.binary_dilation(keep_mask, iterations=2) & (diff > 0.15 * float(np.percentile(diff[keep_mask], 95)))

    ink = np.clip(diff / max(float(np.percentile(diff[keep_mask], 95)), 1.0), 0, 1) * keep_mask
    return Image.fromarray((255 * (1 - ink)).astype(np.uint8), "L"), True

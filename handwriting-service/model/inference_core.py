
import json, os
import numpy as np, torch
from PIL import Image
from model_def import HanziCNN
from preprocess import preprocess

class Recognizer:
    def __init__(self, model_dir, device=None, threshold=0.5):
        self.device = torch.device(device or ("cuda" if torch.cuda.is_available() else "cpu"))
        cfg = json.load(open(os.path.join(model_dir, "config.json"), encoding="utf-8"))
        self.classes = json.load(open(os.path.join(model_dir, "classes.json"), encoding="utf-8"))
        self.mean, self.std, self.threshold = cfg["mean"], cfg["std"], threshold
        self.model = HanziCNN(len(self.classes), cfg["width"], cfg["dropout"])
        self.model.load_state_dict(torch.load(os.path.join(model_dir, "model.pt"), map_location="cpu"))
        self.model.to(self.device).eval()

    @torch.no_grad()
    def predict(self, img, topk=3):
        # Thực hiện các bước tiền xử lý ảnh độc lập, chuẩn hóa đặc trưng
        x = torch.from_numpy(preprocess(img))[None]
        x = ((x - self.mean) / self.std).to(self.device)
        p = torch.softmax(self.model(x), dim=1)[0].cpu()
        conf, idx = p.topk(min(topk, len(self.classes)))
        top = [{"label": self.classes[i], "confidence": float(c)} for c, i in zip(conf.tolist(), idx.tolist())]
        return {"label": top[0]["label"], "confidence": top[0]["confidence"],
                "accepted": top[0]["confidence"] >= self.threshold, "topk": top}

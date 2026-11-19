
import torch, torch.nn as nn
# Định nghĩa một khối cơ bản gồm 2 tầng tích chập Conv + chuẩn hóa Batch Normalization + kích hoạt ReLU và MaxPool
def _block(cin, cout):
    return nn.Sequential(
        nn.Conv2d(cin, cout, 3, padding=1, bias=False), nn.BatchNorm2d(cout), nn.ReLU(inplace=True),
        nn.Conv2d(cout, cout, 3, padding=1, bias=False), nn.BatchNorm2d(cout), nn.ReLU(inplace=True),
        nn.MaxPool2d(2))

# Định nghĩa lớp mô hình HanziCNN
class HanziCNN(nn.Module):
    def __init__(self, n_classes, width=32, dropout=0.3):
        super().__init__()
        w = width
        # Thiết kế 4 khối tích chập liên tiếp tăng dần số kênh (width -> 2w -> 4w -> 8w)
        self.features = nn.Sequential(_block(1, w), _block(w, 2 * w), _block(2 * w, 4 * w), _block(4 * w, 8 * w))
        # Đầu ra sử dụng Global Adaptive Average Pooling giúp giảm phụ thuộc kích thước ảnh và Dropout tránh quá khớp
        self.head = nn.Sequential(nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Dropout(dropout), nn.Linear(8 * w, n_classes))
    def forward(self, x):
        return self.head(self.features(x))

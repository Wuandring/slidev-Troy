# Con ngựa thành Troy

Bản trình chiếu Slidev 21 slide dựa trên `Trojan_Horse_Animation_Notes.pptx`.

## Chạy

```powershell
cd E:\slidev-Troy
npm.cmd run dev
```

Mở địa chỉ mà terminal hiển thị. Dùng phím phải / Space để chạy từng nhịp; phím trái để lùi. Nhấn P để mở chế độ thuyết trình và đọc ghi chú. Nhấn G để tìm slide theo tên.

## Nội dung và chuyển động

- `slides.md`: thứ tự, số nhịp bấm và toàn bộ ghi chú từ PowerPoint.
- `components/TroyDeck.vue`: nội dung và bố cục của 21 slide theo 3 sắc thái thị giác (Dark Gate, Warm Parchment, Technical Alabaster).
- `components/TroyScene.vue`: cảnh cổng thành toàn khung, ngựa gỗ, cánh cổng mở 3D, lớp tường che khuất và cảnh quét cắt lớp.
- `components/TroyCharacters.vue`: lính gác có khớp cổ/tay giáo, nhân vật tiên tri Cassandra và ngựa thật cùng phong cách vector 2D phẳng.
- `components/HorseRig.vue`: SVG ngựa gỗ từ bản gốc, bánh xe có nan hoa quay đúng chiều và nắp hông mở riêng.
- `style.css` & `public/fonts.css`: hệ thống chữ (`Be Vietnam Pro` + `JetBrains Mono`), bảng màu và chuyển động tự giảm theo thiết lập hệ điều hành.
- `data/source.json`: nội dung và note trích nguyên bản để đối chiếu.

Hoạt ảnh bám các nhịp B0, B1… trong `ANIMATION_STORYBOARD.md`, dùng trạng thái xác định theo số lần bấm (tiến/lùi đều khôi phục đúng trạng thái). Cảnh thành Troy là minh họa, không phải tái dựng lịch sử.

Ví dụ Hypothesis và mutation được ghi rõ là minh họa, không giả lập kết quả chạy thực nghiệm. Bản PowerPoint nguồn không bị thay đổi. Animation chạy trong Slidev.

## Build

```powershell
npm.cmd run build
```

Kết quả ở `dist`. Để chạy bản build bằng máy chủ HTTP cục bộ:

```powershell
python -m http.server 8080 --directory dist
```

Mở http://localhost:8080. Không mở trực tiếp `index.html` qua `file://`.

## Host trên GitHub Pages

Dự án đã tích hợp sẵn workflow `.github/workflows/deploy.yml` (tự động nhận diện đường dẫn `--base` theo tên repository và tạo `404.html` cho SPA routing):

1. Tạo một repository mới trên GitHub (ví dụ `slidev-Troy`, để trống không tích README).
2. Vào **Settings → Pages** của repository trên GitHub → tại mục **Build and deployment → Source**, chọn **GitHub Actions**.
3. Push code lên nhánh `main`:

```powershell
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

GitHub Actions sẽ tự động build và xuất bản bài thuyết chiếu tại `https://<username>.github.io/<repo-name>/`.

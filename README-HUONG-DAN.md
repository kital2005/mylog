# CoreVault — Bản sửa toàn bộ (hướng dẫn cập nhật)

## 1. Đưa code lên web (3 bước)

1. Giải nén file zip này, **chép đè tất cả file** vào thư mục `mylog` bạn đã clone (giữ nguyên thư mục ẩn `.git`).
2. **Xóa 2 file thừa** trong thư mục cũ: `logo(2).svg` và `textUpdate.txt` (không dùng tới).
3. Mở terminal trong VS Code:
   ```
   git add .
   git commit -m "Rewrite: fix bugs, security, shared layout"
   git push origin main
   ```
   Vercel tự build lại sau 1–2 phút, `www.corevaultos.com` sẽ cập nhật.

> Vẫn thấy giao diện cũ? Bấm Ctrl+F5 để xóa cache trình duyệt.

## 2. Bật bảo mật Firestore (rất nên làm, khoảng 5 phút)

Trước đây ai cũng có thể mở DevTools để đọc link tải của sản phẩm trả phí, hoặc tự ghi đơn "Completed". Bản mới đã chuyển link tải sang vùng riêng, nhưng **chỉ thật sự an toàn khi bạn bật Rules**:

1. Deploy code (bước 1) trước.
2. Đăng nhập admin, vào **Admin → Settings → "Chạy chuyển dữ liệu"** (chạy 1 lần, chạy lại cũng không sao). Nó sẽ chuyển link tải sản phẩm, chuyển đơn hàng cũ sang định dạng mới, chuyển link video ASMR "LIMITED", và tạo mã `ASMR99` / `VIPKEY`.
3. Vào **Firebase Console → Firestore Database → Rules**, copy toàn bộ `firestore.rules` dán vào rồi **Publish**. Hãy lưu rules cũ để quay lại nếu cần.
4. Thử nhanh: đăng nhập tài khoản thường, nhận 1 tool miễn phí, vào Kho đồ và tải được. Sau đó đăng nhập admin, duyệt 1 đơn.

Nếu sau khi bật Rules có chức năng báo lỗi quyền, mở F12 → Console và gửi mình dòng lỗi.

## 3. Cài đặt nên chỉnh

- **`config.js`**: email admin, tỉ giá, tài khoản ngân hàng, PayPal, email liên hệ. Sửa một chỗ là mọi trang tự cập nhật. Nếu đổi email admin thì sửa luôn trong `firestore.rules`.
- **Email đặt lại mật khẩu**: Firebase Console → Authentication → Templates → Password reset → Customize action URL → `https://www.corevaultos.com/reset`.
- **Authentication → Settings → Authorized domains**: cần có `www.corevaultos.com` và `corevaultos.com`.
- Nên **xác minh email admin** trong Firebase.
- `legal.html` (Chính sách / Điều khoản) là **nội dung mẫu**, bạn đọc lại và chỉnh cho đúng thực tế.
- Mã mở khóa ASMR giờ quản lý ở **Admin → Content Hub → ASMR** (trước đây gắn cứng trong code).

## 4. Những gì đã sửa

**Lỗi chức năng**
- Cấu hình Min/Rec của sản phẩm bị dính thành 1 dòng → đã tách dòng đúng.
- Nút "View All" ở trang chủ bị đổi chữ thành "All" khi chuyển ngôn ngữ.
- Trang chủ lấy 3 sản phẩm tùy ý → nay lấy 3 sản phẩm mới nhất, bỏ sản phẩm ẩn.
- Bấm mua nhiều lần tạo nhiều đơn trùng → mỗi người/sản phẩm chỉ có 1 đơn; nút đổi thành "Mở Kho đồ / Chờ duyệt".
- Hero kẹt chữ "Please wait…" khi không tải được cấu hình → có nội dung mặc định.
- Biểu đồ Dashboard là số giả → nay tính từ đơn hàng thật 7 ngày; thêm thống kê người dùng và đơn chờ duyệt.
- "Export CSV" và ô tìm kiếm không làm gì → đã chạy thật. Nút "Add User" đã bỏ vì không thể tạo tài khoản đăng nhập từ trình duyệt.
- Người dùng thiếu trường `status` bị hiện "Banned" → coi là Active.
- Content Hub vỡ bố cục tab Cộng đồng và thiếu thanh bên → đã thống nhất khung admin.
- Mật khẩu: quy tắc chỉ hiển thị mà không bắt buộc, lại giới hạn tối đa 12 ký tự → nay bắt buộc ≥8 ký tự + chữ hoa + số + ký tự đặc biệt, không giới hạn tối đa; bắt buộc đồng ý điều khoản.
- Tên đăng nhập "duy nhất" nhưng không kiểm tra → nay kiểm tra thật và chặn tên admin, system…
- Avatar lưu ảnh gốc base64 (dễ vượt 1MB của Firestore) → tự cắt vuông, nén 256px; trong bài viết dùng ảnh thu nhỏ.
- Tham số `?return=` có thể bị lợi dụng chuyển hướng ra ngoài → chỉ chấp nhận trang nội bộ.
- Trang ASMR không có link từ menu và không có chế độ bảo trì → đã thêm.
- Menu điện thoại thiếu Đăng xuất / Kho đồ / Admin → đã thêm.
- Link footer (Privacy/Terms/Contact) là `#` → trỏ tới `legal.html`.

**Bảo mật**
- Lỗ hổng **XSS**: tên người dùng, bài viết, bình luận, link… được chèn thẳng vào HTML (có thể chạy script, kể cả trên trang admin). Nay mọi dữ liệu đều được escape, link chỉ nhận http(s).
- Link tải sản phẩm, link ASMR giới hạn, mã mở khóa: chuyển vào vùng riêng và có Rules (mục 2).
- Huy hiệu ADMIN không còn giả mạo được (dựa trên UID admin lưu trên server).
- Mã phòng riêng được băm SHA-256 thay vì lưu chữ thường.
- Thêm header bảo mật trong `vercel.json`; `robots.txt` chặn index trang admin.

**Cấu trúc & trải nghiệm**
- Gộp phần code lặp ở mọi trang (menu, footer, nút nổi, đăng nhập…) vào `layout.js`, `common.js`, `auth-guard.js` → sửa 1 chỗ, mọi trang đổi.
- Tự chọn Tiếng Việt/English theo trình duyệt ở lần đầu; đổi ngôn ngữ vẽ lại ngay nội dung động.
- Cộng đồng: cập nhật realtime, thả tim/bình luận không còn ghi đè nhau, giữ nội dung đang gõ, link bấm được, nhớ phòng riêng đã vào, xóa phòng xóa luôn bài viết.
- Video chỉ nạp video đang xem; Tools có tìm kiếm + lọc + sắp xếp; thông báo dạng toast thay cho `alert`.
- SEO: ảnh chia sẻ `og-image.png`, `sitemap.xml`, `robots.txt`, thẻ meta đầy đủ.

## 5. Lưu ý thật lòng

- Mình **không có mạng** nên không chạy thử trực tiếp với Firebase của bạn. Mình đã kiểm tra cú pháp toàn bộ script, các ID giao diện và logic bảo mật, nhưng bạn hãy thử sau khi deploy: đăng ký, đăng nhập, đăng bài, mua, duyệt đơn.
- Thanh toán vẫn là **chuyển khoản thủ công + admin duyệt**. Muốn tự động cần backend (Cloud Functions hoặc dịch vụ như SePay/Casso).
- Tailwind vẫn nạp qua CDN nên console sẽ có cảnh báo "should not be used in production". Site vẫn chạy ổn; nếu cần tối ưu tốc độ thì nên build CSS riêng.
- Chữ trong khu **Admin** chủ yếu là tiếng Việt (chỉ bạn dùng).
- Xóa hồ sơ người dùng ở Admin không xóa tài khoản đăng nhập; muốn xóa hẳn thì vào Firebase Console → Authentication.

// ============================================================
//  CẤU HÌNH CHUNG CỦA COREVAULT  (chỉ cần sửa ở đây)
// ============================================================

// Email được phép vào khu vực Admin (viết thường).
// LƯU Ý: nếu đổi email ở đây thì cũng phải đổi trong file firestore.rules.
export const ADMIN_EMAILS = ["thaituan.28012020@gmail.com"];

// Tỉ giá hiển thị: 1 USD = ? VND (nhớ đổi cả EXCHANGE_RATE trong lang.js)
export const EXCHANGE_RATE = 25000;

// Thông tin nhận chuyển khoản (tạo QR VietQR ở trang chi tiết sản phẩm)
export const BANK = { bankId: "970436", account: "0111000305886", name: "THAI TUAN" };

// Link ủng hộ ở trang ASMR
export const PAYPAL_URL = "https://paypal.me/thaituan2801";

// Email liên hệ hiển thị ở trang Legal
export const CONTACT_EMAIL = "thaituan.28012020@gmail.com";

// Các tên người dùng bị cấm đăng ký (chống giả mạo admin)
export const RESERVED_USERNAMES = ["admin", "administrator", "root", "system", "corevault", "moderator", "support", "lunarrider0"];

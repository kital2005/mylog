import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// ĐIỀN EMAIL CỦA GIÁM ĐỐC VÀO ĐÂY (Chỉ những email này mới được vào trang Admin)
const ADMIN_EMAILS = [
    "thaituan.28012020@gmail.com"
];

// Hàm kiểm tra giấy tờ khi vừa vào trang
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Trường hợp 1: Chưa đăng nhập -> Đá ra ngoài form Login
        window.location.replace("auth.html");
    } else {
        // Trường hợp 2: Đã đăng nhập, bắt đầu soi Email
        if (!ADMIN_EMAILS.includes(user.email)) {
            // Không phải Admin -> Báo động và đá về trang chủ của khách
            alert("SECURITY ALERT: Tài khoản " + user.email + " không có quyền truy cập khu vực này!");
            window.location.replace("index.html");
        } else {
            // Đúng là Admin -> Mở rèm cho xem nội dung trang (Chống chớp nháy giao diện)
            document.body.style.display = "flex";
        }
    }
});

// Hàm Đăng Xuất (Sẽ gắn vào nút Avatar ở góc)
window.logoutAdmin = function() {
    signOut(auth).then(() => {
        // Đăng xuất thành công thì quay về trang Login
        window.location.replace("auth.html");
    }).catch((error) => {
        alert("Lỗi đăng xuất: " + error.message);
    });
};
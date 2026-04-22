// 1. TẠO TỪ ĐIỂN
const langData = {
    en: {
        "nav_home": "Home",
        "nav_tools": "Tools Vault",
        "nav_about": "About Me",
        "nav_login": "Login",
        "hero_title": "Welcome to CoreVault!",
        "hero_desc": "Your premier destination for premium tools, optimized resources, and exclusive tech applications.",
        "hero_btn": "Explore Now",
        "lang_btn": "EN / VN"
    },
    vn: {
        "nav_home": "Trang Chủ",
        "nav_tools": "Kho Công Cụ",
        "nav_about": "Về Tôi",
        "nav_login": "Đăng Nhập",
        "hero_title": "Chào mừng đến CoreVault!",
        "hero_desc": "Điểm đến hàng đầu cho các công cụ cao cấp, tài nguyên tối ưu và ứng dụng công nghệ độc quyền.",
        "hero_btn": "Khám Phá Ngay",
        "lang_btn": "VN / EN"
    }
};

// 2. LẤY NGÔN NGỮ ĐÃ LƯU (Mặc định là tiếng Anh)
let currentLang = localStorage.getItem('site_language') || 'en';

// 3. HÀM CẬP NHẬT GIAO DIỆN
function updateLanguage() {
    // Tìm tất cả các thẻ HTML có chứa thuộc tính data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        // Lấy mã từ vựng (ví dụ: "nav_home")
        const key = el.getAttribute('data-i18n'); 
        
        // Nếu tìm thấy từ đó trong từ điển thì thay thế text
        if (langData[currentLang][key]) {
            el.innerText = langData[currentLang][key];
        }
    });

    // Lưu lại lựa chọn vào bộ nhớ trình duyệt
    localStorage.setItem('site_language', currentLang);
}

// 4. HÀM ĐỔI NGÔN NGỮ (Sẽ gắn vào nút bấm)
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vn' : 'en'; // Đảo ngược giữa en và vn
    updateLanguage(); // Cập nhật lại chữ
}

// 5. CHẠY HÀM NGAY KHI VÀO TRANG
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
});
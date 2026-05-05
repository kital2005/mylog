const langData = {
    en: {
        "nav_home": "Home", "nav_tools": "Tools Vault", "nav_about": "About Me", "nav_login": "Login", "hero_title": "Welcome to CoreVault!", "hero_desc": "Your premier destination for premium tools, optimized resources, and exclusive tech applications.", "hero_btn": "Explore Now", "lang_btn": "EN / VN",
        "footer_nav": "Navigation", "footer_legal": "Legal & Support", "footer_status": "System Online", "footer_copy": "© 2026 CoreVault Project. Developed by <span class='text-gray-300'>LunarRider0</span>.",
        "admin_os": "CoreVault OS", "admin_dashboard": "Dashboard", "admin_products": "Products", "admin_users": "Users", "admin_orders": "Orders", "admin_content": "Content Hub", "admin_search": "Search...", "admin_settings": "Settings",
        "dash_overview": "Overview", "dash_welcome": "Welcome back. Here's what's happening with your platform.", "dash_active": "Active Tools", "dash_visits": "Total Tools", "dash_new_users": "Total Orders", "dash_revenue": "Total Revenue", "dash_chart": "Traffic & Revenue Overview", "dash_sales": "Recent Sales",
        "prod_title": "Products Vault", "prod_desc": "Manage your tools, updates, pricing, and downloads.", "prod_add": "Add New Tool", "user_title": "Users Management", "user_desc": "Monitor accounts, subscriptions, and security logs.", "user_add": "Add User", "order_title": "Transactions & Orders", "order_desc": "Track purchases, manage refunds, and view revenue logs.", "order_export": "Export CSV", "th_user": "User", "th_plan": "Plan", "th_status": "Status", "th_action": "Actions", "th_order_id": "Order ID", "th_product": "Product", "th_amount": "Amount", "prod_th_info": "Product Info", "prod_th_cat": "Category", "prod_th_price": "Price", "prod_th_status": "Status", "prod_th_action": "Actions",
        "val_premium": "Premium", "val_active": "Active", "val_completed": "Completed", "val_gaming": "Gaming", "val_system": "System", "val_graphics": "Graphics", "val_maintenance": "Maintenance", "val_hidden": "Hidden", "val_free": "FREE", "btn_ban": "Ban", "btn_edit": "Edit", "btn_delete": "Delete", "btn_get_tool": "Get Tool", "filter_all": "All",
        "auth_subtitle_login": "Welcome back, gamer!", "auth_subtitle_reg": "Join CoreVault today.", "auth_subtitle_forgot": "Password Recovery", "auth_tab_login": "Log In", "auth_tab_reg": "Sign Up", "auth_back": "Back to Home", "auth_user_email": "Email Address", "auth_pwd": "Password", "auth_remember": "Remember me", "auth_forgot": "Forgot Password?", "auth_btn_login": "Sign In", "auth_avatar": "Avatar (Optional)", "auth_user": "Username (Unique)", "auth_err_user": "This username is already taken.", "auth_email": "Email Address", "auth_pwd_confirm": "Confirm Password", "auth_err_match": "Passwords do not match.", "auth_agree": "I agree to the Terms of Service and Privacy Policy.", "auth_btn_reg": "Create Account", "auth_forgot_desc": "Enter your email address and we'll send you a link to reset your password.", "auth_btn_reset": "Send Reset Link", "auth_cancel": "Cancel and return to Login",
        "modal_name": "Product Name *", "modal_cat": "Category *", "modal_price": "Price * (0 for Free)", "modal_status": "Status *", "modal_desc": "Description", "modal_btn_cancel": "Cancel", "modal_btn_save": "Save",
        "set_title": "Homepage Configuration", "set_desc": "Manage hero carousel and welcome texts.", "set_hero_text": "Hero Texts", "set_hero_slides": "Carousel Slides (URLs)", "set_interval": "Slide Interval (s)", "btn_save_settings": "Save Changes",
        "home_latest_title": "Latest Tools", "home_latest_desc": "Hand-picked premium & free resources for you.", "home_fetching": "Fetching data from Cloud...", "home_no_tools": "Currently no tools available.", "tool_desc_active": "Premium tool validated by CoreVault Security.", "tool_desc_maintenance": "Currently under maintenance.", "search_tools": "Search for tools...", "filter_category": "Filter by Category:", "detail_not_found": "Tool not found or has been removed.", "detail_btn_buy": "Purchase Tool", "detail_btn_download": "Download Now", "detail_features": "Key Features", "modal_req_min": "Minimum Requirements (1 per line)", "modal_req_rec": "Recommended Specs (1 per line)", "modal_pay_title": "Payment Checkout", "modal_pay_desc": "Scan the QR code with your banking app.", "modal_pay_btn": "I have paid", "msg_login_req": "Please login to continue!", "detail_req_min_title": "Minimum Requirements", "detail_req_rec_title": "Recommended Specs", "detail_license": "License / Access", "detail_verified": "Verified", "detail_instant": "Instant Delivery",
        "about_title": "About LunarRider0", "about_role": "IT Student | Developer | Content Creator", "about_bio_title": "My Journey", "about_connect": "Connect with me",
        "nav_community": "Community", "nav_videos": "Shorts & Videos", "nav_resources": "OS & Resources",
        "com_title": "CoreVault Community", "com_desc": "Discuss tools, gaming, and tech with fellow members.", "com_placeholder": "What's on your mind today?", "com_post_btn": "Post to Community", "com_channels": "Rooms", "com_create_room": "+ New Room", "com_join_room": "Join Private", "com_general": "🌐 General Chat", "com_tech": "💻 Tech Support", "com_gaming": "🎮 Gaming Hub", "com_like": "Like", "com_reply": "Reply", "com_write_reply": "Write a comment...", "btn_send": "Send", 
        "vid_title": "Video Hub", "vid_desc": "Watch shorts or download Raw 4K files.", "vid_upload_btn": "Upload Video", "vid_modal_title": "Upload Video File", "vid_url": "Video Link (YouTube or .mp4)", "vid_quality": "Quality (e.g. 4K 60FPS)",
        "res_title": "OS & Tweak Files", "res_desc": "Exclusive custom OS builds and system optimizers.", "res_size": "File Size", "btn_dl_now": "Download File", "res_upload_btn": "Share File", "res_modal_title": "Upload Resource",
        
        // BẢO TRÌ EN
        "set_maint_title": "Maintenance Mode", "set_maint_desc": "Lock pages for regular users (Admins can bypass).", "set_lock_com": "Lock Community Page", "set_lock_vid": "Lock Videos Hub", "set_lock_res": "Lock OS & Resources"
    },
    vn: {
        "nav_home": "Trang Chủ", "nav_tools": "Kho Công Cụ", "nav_about": "Về Tôi", "nav_login": "Đăng Nhập", "hero_title": "Chào mừng đến CoreVault!", "hero_desc": "Điểm đến hàng đầu cho các công cụ cao cấp, tài nguyên tối ưu và ứng dụng công nghệ độc quyền.", "hero_btn": "Khám Phá Ngay", "lang_btn": "VN / EN",
        "footer_nav": "Điều hướng", "footer_legal": "Pháp lý & Hỗ trợ", "footer_status": "Hệ thống Online", "footer_copy": "© 2026 Dự án CoreVault. Phát triển bởi <span class='text-gray-300'>LunarRider0</span>.",
        "admin_os": "Hệ Thống CoreVault", "admin_dashboard": "Bảng Điều Khiển", "admin_products": "Kho Sản Phẩm", "admin_users": "Khách Hàng", "admin_orders": "Đơn Hàng", "admin_content": "Quản lý Nội dung", "admin_search": "Tìm kiếm...", "admin_settings": "Cài Đặt",
        "dash_overview": "Tổng Quan", "dash_welcome": "Chào mừng trở lại. Dưới đây là tình hình nền tảng của bạn.", "dash_active": "Công Cụ Hoạt Động", "dash_visits": "Tổng Công Cụ", "dash_new_users": "Tổng Đơn Hàng", "dash_revenue": "Tổng Doanh Thu", "dash_chart": "Biểu đồ Truy cập & Doanh thu", "dash_sales": "Đơn Hàng Gần Đây",
        "prod_title": "Kho Sản Phẩm", "prod_desc": "Quản lý công cụ, cập nhật, giá cả và lượt tải.", "prod_add": "Thêm Công Cụ", "user_title": "Quản lý Khách Hàng", "user_desc": "Theo dõi tài khoản, gói cước và lịch sử bảo mật.", "user_add": "Thêm Khách Hàng", "order_title": "Giao Dịch & Đơn Hàng", "order_desc": "Theo dõi mua hàng, hoàn tiền và doanh thu.", "order_export": "Xuất file Excel", "th_user": "Người Dùng", "th_plan": "Gói Cước", "th_status": "Trạng Thái", "th_action": "Thao Tác", "th_order_id": "Mã Đơn", "th_product": "Sản Phẩm", "th_amount": "Số Tiền", "prod_th_info": "Thông tin SP", "prod_th_cat": "Danh Mục", "prod_th_price": "Giá Bán", "prod_th_status": "Trạng Thái", "prod_th_action": "Thao Tác",
        "val_premium": "Cao Cấp (Premium)", "val_active": "Hoạt Động", "val_completed": "Hoàn Thành", "val_gaming": "Tiện ích Game", "val_system": "Hệ Thống", "val_graphics": "Đồ Họa", "val_maintenance": "Bảo Trì", "val_hidden": "Đã Ẩn", "val_free": "MIỄN PHÍ", "btn_ban": "Khóa (Ban)", "btn_edit": "Chỉnh Sửa", "btn_delete": "Xóa", "btn_get_tool": "Tải Công Cụ", "filter_all": "Tất Cả",
        "auth_subtitle_login": "Chào mừng trở lại, gamer!", "auth_subtitle_reg": "Tham gia CoreVault ngay hôm nay.", "auth_subtitle_forgot": "Khôi phục mật khẩu", "auth_tab_login": "Đăng Nhập", "auth_tab_reg": "Đăng Ký", "auth_back": "Quay lại Trang Chủ", "auth_user_email": "Địa chỉ Email", "auth_pwd": "Mật khẩu", "auth_remember": "Ghi nhớ đăng nhập", "auth_forgot": "Quên mật khẩu?", "auth_btn_login": "Đăng Nhập", "auth_avatar": "Ảnh đại diện (Tùy chọn)", "auth_user": "Tên đăng nhập (Duy nhất)", "auth_err_user": "Tên đăng nhập đã tồn tại.", "auth_email": "Địa chỉ Email", "auth_pwd_confirm": "Xác nhận Mật khẩu", "auth_err_match": "Mật khẩu không khớp.", "auth_agree": "Tôi đồng ý với Điều khoản và Chính sách bảo mật.", "auth_btn_reg": "Tạo Tài Khoản", "auth_forgot_desc": "Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.", "auth_btn_reset": "Gửi Liên Kết", "auth_cancel": "Hủy và quay lại Đăng nhập",
        "modal_name": "Tên Sản Phẩm *", "modal_cat": "Danh Mục *", "modal_price": "Giá bán * (0 là Miễn phí)", "modal_status": "Trạng Thái *", "modal_desc": "Mô tả chi tiết", "modal_btn_cancel": "Hủy", "modal_btn_save": "Lưu",
        "set_title": "Cấu Hình Trang Chủ", "set_desc": "Quản lý ảnh bìa và lời chào.", "set_hero_text": "Nội Dung Chào Mừng", "set_hero_slides": "Ảnh Slides (Link Ảnh/GIF)", "set_interval": "Thời gian chuyển ảnh (giây)", "btn_save_settings": "Lưu Cấu Hình",
        "home_latest_title": "Công Cụ Mới Nhất", "home_latest_desc": "Tuyển tập tài nguyên cao cấp & miễn phí dành cho bạn.", "home_fetching": "Đang tải dữ liệu từ Đám mây...", "home_no_tools": "Hiện chưa có công cụ nào.", "tool_desc_active": "Công cụ cao cấp đã được CoreVault Security kiểm duyệt.", "tool_desc_maintenance": "Hệ thống đang được bảo trì.", "search_tools": "Tìm kiếm công cụ...", "filter_category": "Lọc theo Danh mục:", "detail_not_found": "Không tìm thấy công cụ hoặc đã bị xóa.", "detail_btn_buy": "Mua Công Cụ", "detail_btn_download": "Tải Xuống Ngay", "detail_features": "Tính Năng Nổi Bật", "modal_req_min": "Cấu hình Tối thiểu (1 mục/dòng)", "modal_req_rec": "Cấu hình Đề nghị (1 mục/dòng)", "modal_pay_title": "Thanh Toán Đơn Hàng", "modal_pay_desc": "Sử dụng App Ngân hàng để quét mã QR bên dưới.", "modal_pay_btn": "Tôi đã chuyển khoản", "msg_login_req": "Vui lòng đăng nhập để tiếp tục!", "detail_req_min_title": "Cấu Hình Tối Thiểu", "detail_req_rec_title": "Cấu Hình Khuyên Dùng", "detail_license": "Bản Quyền / Truy Cập", "detail_verified": "Đã Kiểm Duyệt", "detail_instant": "Giao Hàng Tức Thì",
        "about_title": "Về LunarRider0", "about_role": "Sinh viên IT | Lập trình viên | Sáng tạo nội dung", "about_bio_title": "Hành trình của tôi", "about_connect": "Kết nối với mình",
        "nav_community": "Cộng Đồng", "nav_videos": "Video Shorts & Raw", "nav_resources": "Bản Win & Tài Liệu",
        "com_title": "Cộng Đồng CoreVault", "com_desc": "Nơi thảo luận công nghệ, game và giao lưu gỡ rối.", "com_placeholder": "Bạn đang nghĩ gì hôm nay?", "com_post_btn": "Đăng Bài", "com_channels": "Phòng Chat", "com_create_room": "+ Tạo Phòng", "com_join_room": "Vào Phòng Kín", "com_general": "🌐 Kênh Tổng", "com_tech": "💻 Hỗ trợ IT", "com_gaming": "🎮 Chuyện Game", "com_like": "Thích", "com_reply": "Bình luận", "com_write_reply": "Viết bình luận...", "btn_send": "Gửi", 
        "vid_title": "Trung tâm Video", "vid_desc": "Lướt Shorts hoặc tải phim Anime/Donghua chất lượng cao.", "vid_upload_btn": "Đóng Góp Video", "vid_modal_title": "Chia Sẻ Video", "vid_url": "Link Video (Youtube/MP4)", "vid_quality": "Chất lượng (VD: 4K 60FPS)",
        "res_title": "Bản Win & Tài Liệu", "res_desc": "Kho hệ điều hành tùy chỉnh và công cụ tối ưu độc quyền.", "res_size": "Dung lượng", "btn_dl_now": "Tải Ngay", "res_upload_btn": "Đóng Góp File", "res_modal_title": "Chia Sẻ File Lên Cloud",
        
        // BẢO TRÌ VN
        "set_maint_title": "Chế Độ Bảo Trì", "set_maint_desc": "Tạm khóa tính năng đối với khách hàng (Admin luôn vào được).", "set_lock_com": "Khóa Trang Cộng Đồng", "set_lock_vid": "Khóa Trang Video & Raw", "set_lock_res": "Khóa Trang OS & File"
    }
};

let currentLang = localStorage.getItem('site_language') || 'en';

function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n'); 
        if (langData[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = langData[currentLang][key];
            } else {
                el.innerHTML = langData[currentLang][key];
            }
        }
    });

    const EXCHANGE_RATE = 25000; 
    const priceElements = document.querySelectorAll('[data-price-value]');
    priceElements.forEach(el => {
        const basePriceUSD = parseFloat(el.getAttribute('data-price-value'));
        if (currentLang === 'vn') {
            const priceVND = basePriceUSD * EXCHANGE_RATE;
            el.innerHTML = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVND);
        } else {
            el.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(basePriceUSD);
        }
    });

    localStorage.setItem('site_language', currentLang);
}

window.toggleLanguage = function() {
    currentLang = currentLang === 'en' ? 'vn' : 'en';
    updateLanguage();
}

document.addEventListener('DOMContentLoaded', updateLanguage);
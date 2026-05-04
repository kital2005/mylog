import { auth, db, doc, getDoc, setDoc } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// ĐIỀN EMAIL CỦA GIÁM ĐỐC VÀO ĐÂY (Chỉ những email này mới được vào trang Admin)
const ADMIN_EMAILS = [
    "thaituan.28012020@gmail.com"
];

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.replace("auth.html");
    } else {
        if (!ADMIN_EMAILS.includes(user.email)) {
            alert("SECURITY ALERT: Tài khoản " + user.email + " không có quyền truy cập khu vực này!");
            window.location.replace("index.html");
        } else {
            document.body.style.display = "flex";
            
            // ĐỒNG BỘ AVATAR VÀ TÊN CỦA ADMIN (Tự động fix lỗi nếu acc Admin cũ chưa có dữ liệu)
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);
                
                let username = user.email.split('@')[0];
                let avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
                
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    if (data.username) username = data.username;
                    if (data.avatar && data.avatar.trim() !== '' && !data.avatar.includes('placeholder')) {
                        avatar = data.avatar;
                    }
                } else {
                    // Nếu sếp chưa có hồ sơ trong DB, tự động tạo mới
                    await setDoc(userDocRef, {
                        username: username,
                        email: user.email,
                        avatar: avatar,
                        status: 'Active',
                        plan: 'Premium',
                        createdAt: new Date()
                    }, { merge: true });
                }

                const adminProfileBtn = document.getElementById('admin-profile-btn');
                const adminNameDisplay = document.getElementById('admin-username-display');
                
                if (adminProfileBtn) {
                    adminProfileBtn.innerHTML = `<img src="${avatar}" class="w-full h-full object-cover">`;
                    adminProfileBtn.title = `Đăng xuất (${username})`;
                }
                if (adminNameDisplay) {
                    adminNameDisplay.innerText = username;
                }
            } catch(error) {
                console.error("Lỗi đồng bộ Avatar Admin:", error);
            }
        }
    }
});

window.logoutAdmin = function() {
    signOut(auth).then(() => {
        window.location.replace("auth.html");
    }).catch((error) => {
        alert("Lỗi đăng xuất: " + error.message);
    });
};
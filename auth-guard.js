// ============================================================
//  auth-guard.js — khung giao diện Admin + kiểm tra quyền
//  Mỗi trang admin có <div id="admin-page" data-active="..."> chứa nội dung.
//  Dùng:  import { adminReady } from './auth-guard.js';  const me = await adminReady;
//  LƯU Ý: kiểm tra ở trình duyệt chỉ để ẩn giao diện. Việc chặn thật sự nằm ở
//  Firestore Security Rules (file firestore.rules).
// ============================================================
import { db, collection, getDocs, query, where } from './firebase.js';
import { onUser, esc, toast, t, logout } from './common.js';

const NAV = [
  ['admin.html', 'admin_dashboard', 'Dashboard', '📊', 'dashboard'],
  ['admin-products.html', 'admin_products', 'Products', '📦', 'products'],
  ['admin-users.html', 'admin_users', 'Users', '👥', 'users'],
  ['admin-orders.html', 'admin_orders', 'Orders', '🧾', 'orders'],
  ['admin-content.html', 'admin_content', 'Content Hub', '🗂️', 'content'],
  ['admin-settings.html', 'admin_settings', 'Settings', '⚙️', 'settings']
];

function buildShell() {
  const page = document.getElementById('admin-page');
  const active = page.dataset.active;
  const content = page.innerHTML; page.remove();
  const links = NAV.map(([href, key, label, icon, id]) => `
    <a href="${href}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${id === active ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30 font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-700 border border-transparent font-medium'}">
      <span class="text-lg">${icon}</span><span data-i18n="${key}">${label}</span>
      ${id === 'orders' ? '<span id="pending-badge" class="hidden ml-auto bg-yellow-500 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full"></span>' : ''}
    </a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="flex h-[100dvh] w-full relative overflow-hidden">
    <div id="sb-overlay" class="fixed inset-0 bg-black/60 z-40 hidden md:hidden backdrop-blur-sm"></div>
    <aside id="sidebar" class="w-64 bg-gray-800 border-r border-gray-700 flex flex-col absolute inset-y-0 left-0 -translate-x-full md:relative md:translate-x-0 transition-transform duration-300 z-50 shadow-2xl md:shadow-none">
      <div class="h-16 flex items-center justify-between px-6 border-b border-gray-700 shrink-0">
        <a href="admin.html" class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CoreVault OS</a>
        <button id="sb-close" class="md:hidden text-gray-400 hover:text-white text-xl" aria-label="Close">✕</button>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">${links}</nav>
      <div class="p-4 border-t border-gray-700 shrink-0"><a href="index.html" class="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-2 py-2">↩ <span data-i18n="admin_view_site">View website</span></a></div>
    </aside>
    <main class="flex-1 flex flex-col h-full overflow-hidden min-w-0">
      <header class="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-8 shrink-0">
        <button id="sb-open" class="md:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-gray-800 border border-gray-700" aria-label="Menu">☰</button>
        <div class="hidden md:block text-sm text-gray-500" data-i18n="admin_panel_title">Administration</div>
        <div class="flex items-center gap-3">
          <button onclick="toggleLanguage()" class="text-gray-300 hover:text-white px-3 py-1.5 text-xs md:text-sm font-medium border border-gray-700 hover:bg-gray-800 rounded-lg"><span data-i18n="lang_btn">EN / VN</span></button>
          <span id="admin-name" class="hidden md:block text-sm font-bold text-gray-300"></span>
          <img id="admin-avatar" alt="" class="w-9 h-9 rounded-full object-cover border border-gray-600 bg-gray-800">
          <button id="admin-logout" class="text-xs md:text-sm font-bold text-gray-400 hover:text-red-400 transition-colors" data-i18n="nav_logout">Logout</button>
        </div>
      </header>
      <div id="admin-content" class="flex-1 overflow-y-auto p-4 md:p-8">${content}</div>
    </main>
  </div>`);
  const sb = document.getElementById('sidebar'), ov = document.getElementById('sb-overlay');
  const toggle = (open) => { sb.classList.toggle('-translate-x-full', !open); ov.classList.toggle('hidden', !open); };
  document.getElementById('sb-open').onclick = () => toggle(true);
  document.getElementById('sb-close').onclick = () => toggle(false);
  ov.onclick = () => toggle(false);
  document.getElementById('admin-logout').onclick = logout;
}
buildShell();

export const adminReady = new Promise((resolve) => {
  onUser(async (user, p) => {
    if (!p.isAdmin) {
      toast(t('admin_denied'), 'error', 5000);
      setTimeout(() => location.replace('index.html'), 1200);
      return;
    }
    document.body.style.visibility = 'visible';
    document.getElementById('admin-name').textContent = p.username;
    document.getElementById('admin-avatar').src = p.avatar;
    window.updateLanguage();
    // Số đơn đang chờ duyệt
    try {
      const n = (await getDocs(query(collection(db, 'orders'), where('status', '==', 'Pending')))).size;
      const b = document.getElementById('pending-badge'); if (n && b) { b.textContent = n; b.classList.remove('hidden'); }
    } catch (e) { /* ignore */ }
    resolve(p);
  }, { require: true });
});

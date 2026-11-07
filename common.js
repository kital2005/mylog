// ============================================================
//  common.js — các hàm dùng chung cho mọi trang
// ============================================================
import {
  auth, db, doc, getDoc, setDoc, getDocs, collection, query, where,
  onAuthStateChanged, signOut, arrayUnion
} from './firebase.js';
import { ADMIN_EMAILS, EXCHANGE_RATE } from './config.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/** Chống XSS: luôn escape dữ liệu người dùng trước khi chèn vào innerHTML */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Chỉ cho phép link http(s) (và ảnh data: nếu data=true). Trả về '' nếu không an toàn. */
export function safeUrl(u, { data = false } = {}) {
  if (!u || typeof u !== 'string') return '';
  const s = u.trim();
  if (data && /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(s)) return s;
  try { const x = new URL(s); if (x.protocol === 'https:' || x.protocol === 'http:') return x.href; } catch (e) { /* ignore */ }
  return '';
}

export const lang = () => localStorage.getItem('site_language') || 'en';
export const t = (k, vars) => (window.t ? window.t(k, vars) : k);
export const isAdminEmail = (e) => ADMIN_EMAILS.includes(String(e || '').toLowerCase());
export const dicebear = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || 'user')}`;
export const tsOf = (v) => (v && typeof v.toMillis === 'function') ? v.toMillis() : (v instanceof Date ? v.getTime() : Number(v) || 0);
export const fmtDate = (v) => { const n = tsOf(v); return n ? new Date(n).toLocaleString(lang() === 'vn' ? 'vi-VN' : 'en-US') : ''; };
export const fmtPrice = (usd) => lang() === 'vn'
  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((Number(usd) || 0) * EXCHANGE_RATE)
  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(usd) || 0);

/** Thông báo nhỏ góc màn hình (thay cho alert) */
export function toast(message, type = 'info', ms = 3800) {
  let box = document.getElementById('cv-toasts');
  if (!box) {
    box = document.createElement('div');
    box.id = 'cv-toasts';
    box.style.visibility = 'visible';
    box.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center w-[92vw] max-w-md pointer-events-none';
    document.body.appendChild(box);
  }
  const colors = { info: 'border-blue-500/60', success: 'border-green-500/60', error: 'border-red-500/60', warn: 'border-yellow-500/60' };
  const icons = { info: 'ℹ️', success: '✅', error: '⚠️', warn: '⚠️' };
  const el = document.createElement('div');
  el.className = `pointer-events-auto w-full bg-gray-800/95 backdrop-blur border ${colors[type] || colors.info} text-white text-sm font-medium rounded-xl shadow-2xl px-4 py-3 flex gap-3 items-start transition-all duration-300 opacity-0 -translate-y-2`;
  el.innerHTML = `<span>${icons[type] || icons.info}</span><span class="flex-1 break-words">${esc(message)}</span>`;
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.remove('opacity-0', '-translate-y-2'));
  setTimeout(() => { el.classList.add('opacity-0'); setTimeout(() => el.remove(), 300); }, ms);
}

/** Trang hiện tại dạng "file.html?x=y" — dùng làm tham số ?return= */
export const currentPageRef = () => (location.pathname.split('/').pop() || 'index') + location.search;
export const authUrl = () => `auth.html?return=${encodeURIComponent(currentPageRef())}`;
/** Chỉ chấp nhận đường dẫn nội bộ (chống open-redirect) */
export function safeReturn(raw) {
  if (!raw) return '';
  return /^[a-z0-9_-]+(\.html)?(\?[^#\s]*)?$/i.test(raw) ? raw : '';
}

// ---------- Hồ sơ người dùng ----------
export async function loadProfile(user) {
  const username0 = (user.email || 'user').split('@')[0];
  const p = {
    uid: user.uid, email: user.email, username: username0, avatar: '',
    plan: 'Free', status: 'Active', isAdmin: isAdminEmail(user.email)
  };
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const d = snap.data();
      if (d.username) p.username = d.username;
      if (d.plan) p.plan = d.plan;
      if (d.status) p.status = d.status;
      if (d.avatar && !String(d.avatar).includes('placeholder')) p.avatar = safeUrl(d.avatar, { data: true });
    } else {
      // Tài khoản cũ chưa có hồ sơ → tự tạo
      try {
        await setDoc(doc(db, 'users', user.uid), {
          username: username0, email: user.email, avatar: '', status: 'Active',
          plan: p.isAdmin ? 'Premium' : 'Free', createdAt: new Date()
        });
      } catch (e) { /* ignore */ }
    }
  } catch (e) { console.warn('loadProfile:', e); }
  if (!p.avatar) p.avatar = dicebear(p.username);
  return p;
}

/** Danh sách UID của admin (dùng để hiện huy hiệu ADMIN — không thể giả mạo như trường isAdmin cũ) */
let _adminUids = null;
export async function getAdminUids() {
  if (_adminUids) return _adminUids;
  try {
    const s = await getDoc(doc(db, 'settings', 'admins'));
    _adminUids = s.exists() ? (s.data().uids || []) : [];
  } catch (e) { _adminUids = []; }
  return _adminUids;
}
export const isAdminAuthor = (item, uids) => uids.includes(item.uid) || (uids.length === 0 && item.isAdmin === true);

async function registerAdminUid(profile) {
  if (!profile.isAdmin || sessionStorage.getItem('cv_admin_reg') === profile.uid) return;
  try { await setDoc(doc(db, 'settings', 'admins'), { uids: arrayUnion(profile.uid) }, { merge: true }); sessionStorage.setItem('cv_admin_reg', profile.uid); } catch (e) { /* ignore */ }
}

/**
 * Lắng nghe đăng nhập. cb(user, profile) — nếu chưa đăng nhập: cb(null, null)
 * require=true: tự chuyển sang trang đăng nhập nếu chưa đăng nhập.
 * Tài khoản bị khóa sẽ bị đăng xuất.
 */
export function onUser(cb, { require = false } = {}) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (require) { location.replace(authUrl()); return; }
      cb(null, null); return;
    }
    const profile = await loadProfile(user);
    if (profile.status === 'Banned') {
      await signOut(auth);
      toast(t('msg_banned'), 'error', 6000);
      setTimeout(() => location.replace('index.html'), 1500);
      return;
    }
    registerAdminUid(profile);
    cb(user, profile);
  });
}

/** Vẽ khu vực tài khoản trên thanh điều hướng (#header-auth) */
export function renderHeaderAuth(profile, { ring = 'border-blue-500' } = {}) {
  const box = document.getElementById('header-auth');
  const mob = document.getElementById('mobile-auth');
  if (!box) return;
  if (!profile) {
    box.innerHTML = `<a href="${authUrl()}" data-i18n="nav_login" class="text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 md:px-5 py-1.5 md:py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20">Login</a>`;
    if (mob) mob.innerHTML = `<a href="${authUrl()}" data-i18n="nav_login" class="block px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-center">Login</a>`;
  } else {
    const adminLink = profile.isAdmin ? `<a href="admin.html" class="text-xs font-bold text-purple-400 hover:text-purple-300 border border-purple-500/50 px-2 py-1 rounded transition-colors hidden md:block">Admin Panel</a>` : '';
    box.innerHTML = `${adminLink}
      <span class="hidden lg:block text-sm font-medium text-gray-300"><span data-i18n="welcome_back">Welcome back,</span> <b class="text-white">${esc(profile.username)}</b></span>
      <a href="my-vault.html" title="${esc(t('nav_vault'))}" class="block w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 overflow-hidden border-2 ${ring} shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:scale-110 transition-transform"><img src="${esc(profile.avatar)}" alt="" class="w-full h-full object-cover"></a>
      <button id="btn-logout" data-i18n="nav_logout" class="text-xs md:text-sm font-bold text-gray-400 hover:text-red-400 transition-colors hidden md:block">Logout</button>`;
    box.querySelector('#btn-logout').onclick = logout;
    if (mob) {
      mob.innerHTML = `<div class="flex items-center gap-3 px-4 py-2 text-sm text-gray-400"><img src="${esc(profile.avatar)}" class="w-8 h-8 rounded-full object-cover" alt=""><b class="text-white truncate">${esc(profile.username)}</b></div>
        <a href="my-vault.html" data-i18n="nav_vault" class="block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-gray-800 font-medium">My Vault</a>
        ${profile.isAdmin ? '<a href="admin.html" class="block px-4 py-2.5 rounded-xl text-purple-400 hover:bg-gray-800 font-bold">Admin Panel</a>' : ''}
        <button id="btn-logout-m" data-i18n="nav_logout" class="block w-full text-left px-4 py-2.5 rounded-xl text-red-400 hover:bg-gray-800 font-bold">Logout</button>`;
      mob.querySelector('#btn-logout-m').onclick = logout;
    }
  }
  if (window.updateLanguage) window.updateLanguage();
}
export const logout = () => signOut(auth).then(() => { location.href = 'index.html'; });

/** Nhãn danh mục / icon */
export const catKey = (c) => (c === 'Gaming' ? 'val_gaming' : c === 'Graphics' ? 'val_graphics' : 'val_system');
export const catIcon = (c) => (c === 'Gaming' ? '🎮' : c === 'Graphics' ? '✨' : c === 'System' ? '⚙️' : '📦');

/** Thẻ sản phẩm dùng ở trang chủ + trang Tools */
export function productCard(id, d) {
  const price = Number(d.price) > 0
    ? `<div class="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg z-10" data-price-value="${Number(d.price)}"></div>`
    : `<div class="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg z-10" data-i18n="val_free">FREE</div>`;
  const maint = d.status && d.status !== 'Active'
    ? `<div class="absolute top-3 left-3 px-3 py-1 bg-yellow-500/90 text-gray-900 text-[10px] font-extrabold rounded-full uppercase z-10" data-i18n="val_maintenance">Maintenance</div>` : '';
  const img = safeUrl(d.image);
  const cover = img ? `<img src="${esc(img)}" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500" onerror="this.remove()">` : '';
  const desc = (lang() === 'vn' ? (d.descVn || d.descEn) : (d.descEn || d.descVn)) || '';
  const href = `detail.html?id=${encodeURIComponent(id)}`;
  return `<div class="group bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
    <a href="${href}" class="h-40 md:h-48 bg-gray-700 flex items-center justify-center relative overflow-hidden text-5xl md:text-6xl">
      ${cover}<div class="relative z-[1] group-hover:scale-125 transition-transform duration-300 drop-shadow-xl">${esc(d.icon || catIcon(d.category))}</div>${price}${maint}
    </a>
    <div class="p-5 md:p-6 flex-grow flex flex-col">
      <a href="${href}"><h3 class="text-lg md:text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">${esc(d.name)}</h3></a>
      <p class="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow min-h-[2.5rem]">${desc ? esc(desc) : `<span data-i18n="tool_desc_active"></span>`}</p>
      <div class="flex items-center justify-between mt-auto">
        <span data-i18n="${catKey(d.category)}" class="text-gray-500 text-xs uppercase font-bold tracking-widest"></span>
        <a href="${href}" data-i18n="btn_get_tool" class="text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 md:px-4 py-2 rounded-lg transition-all shadow-lg hover:scale-105">Get Tool</a>
      </div>
    </div>
  </div>`;
}

/** Lấy sản phẩm hiển thị công khai, mới nhất trước */
export async function fetchPublicProducts() {
  const snap = await getDocs(query(collection(db, 'products'), where('status', '!=', 'Hidden')));
  const arr = [];
  snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
  arr.sort((a, b) => tsOf(b.timestamp) - tsOf(a.timestamp));
  return arr;
}

/** Hiện/ẩn khối quảng cáo theo settings/ads */
export async function applyAds() {
  const el = document.getElementById('ad-container');
  if (!el) return;
  try {
    const s = await getDoc(doc(db, 'settings', 'ads'));
    el.classList.toggle('hidden', !(s.exists() && s.data().isActive === true));
  } catch (e) { el.classList.add('hidden'); }
}

/** Trang bảo trì (chỉ admin mới vào được) */
export async function checkMaintenance(flag, profile) {
  if (profile && profile.isAdmin) return false;
  try {
    const s = await getDoc(doc(db, 'settings', 'maintenance'));
    if (s.exists() && s.data()[flag]) {
      document.body.innerHTML = `<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 text-center"><div>
        <div class="text-6xl mb-4">🛠️</div><h1 class="text-2xl font-extrabold mb-2" data-i18n="maint_title">Under maintenance</h1>
        <p class="text-gray-400 mb-6" data-i18n="maint_desc">This section is temporarily locked. Please come back later.</p>
        <a href="index.html" class="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold" data-i18n="auth_back">Back to Home</a></div></div>`;
      if (window.updateLanguage) window.updateLanguage();
      return true;
    }
  } catch (e) { /* ignore */ }
  return false;
}

/** Ảnh đại diện: cắt vuông + nén còn 256px JPEG (tránh vượt giới hạn 1MB của Firestore) */
export function fileToAvatar(file, size = 256) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) return reject(new Error('not-image'));
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const s = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad-image')); };
    img.src = url;
  });
}

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Lấy ID YouTube từ nhiều dạng link (watch, youtu.be, shorts, embed) */
export function youtubeId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/** Tìm đơn hàng của user cho 1 sản phẩm (hỗ trợ cả đơn cũ có ID ngẫu nhiên) */
export async function findOrder(user, productId) {
  try {
    const s = await getDoc(doc(db, 'orders', `${user.uid}_${productId}`));
    if (s.exists()) return { id: s.id, ...s.data() };
  } catch (e) { /* ignore */ }
  try {
    const q = await getDocs(query(collection(db, 'orders'), where('user', '==', user.email), where('productId', '==', productId)));
    if (!q.empty) { const best = q.docs.find((d) => d.data().status === 'Completed') || q.docs[0]; return { id: best.id, ...best.data() }; }
  } catch (e) { /* ignore */ }
  return null;
}


/** Ảnh thu nhỏ (64px) để nhúng vào bài viết/bình luận mà không làm phình dung lượng tài liệu */
export function makeThumb(src, size = 64) {
  return new Promise((resolve) => {
    if (!src || !String(src).startsWith('data:')) return resolve(src || '');
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = c.height = size;
      c.getContext('2d').drawImage(img, 0, 0, size, size);
      resolve(c.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => resolve('');
    img.src = src;
  });
}

/** Biến link trong văn bản (đã escape) thành thẻ <a> an toàn */
export function linkify(text) {
  return esc(text).replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-400 underline break-all">${u}</a>`);
}

export { auth, db };

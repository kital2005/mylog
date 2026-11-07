/* ============================================================
   layout.js — thanh điều hướng, footer, nút nổi (FAB) dùng chung
   Dùng: <div id="site-header"></div> ... <div id="site-footer"></div>
   <body data-page="home|tools|about"> để tô sáng mục menu hiện tại.
   ============================================================ */
(function () {
  var page = document.body.getAttribute('data-page') || '';
  function nav(href, key, label, id) {
    var active = page === id;
    var cls = active
      ? 'text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-600/10 text-sm font-bold'
      : 'text-gray-300 px-4 py-2 rounded-lg border border-transparent hover:border-gray-600 hover:bg-gray-800 transition-all duration-200 text-sm font-medium';
    return '<a href="' + href + '" data-i18n="' + key + '" class="' + cls + '">' + label + '</a>';
  }
  function mnav(href, key, label, id) {
    var active = page === id;
    var cls = active
      ? 'block px-4 py-2.5 rounded-xl text-blue-400 bg-blue-600/10 border border-blue-500/20 font-bold'
      : 'block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white font-medium transition-colors';
    return '<a href="' + href + '" data-i18n="' + key + '" class="' + cls + '">' + label + '</a>';
  }
  var gradText = 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent';

  var header = document.getElementById('site-header');
  if (header) {
    header.outerHTML =
    '<nav id="main-nav" class="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 transition-transform duration-300">' +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16">' +
        '<a href="index.html" class="flex items-center gap-3 hover:scale-105 transition-transform flex-shrink-0">' +
          '<img src="logo.svg" alt="CoreVault" class="w-10 h-10 shadow-lg shadow-blue-500/20 rounded-xl">' +
          '<span class="text-xl md:text-2xl font-bold ' + gradText + '">CoreVault</span></a>' +
        '<div class="hidden md:flex items-baseline space-x-2 ml-10 flex-1">' +
          nav('index.html', 'nav_home', 'Home', 'home') + nav('tools.html', 'nav_tools', 'Tools Vault', 'tools') + nav('about.html', 'nav_about', 'About Me', 'about') +
        '</div>' +
        '<div class="flex items-center space-x-2 md:space-x-3">' +
          '<button onclick="toggleLanguage()" aria-label="Language" class="text-gray-300 hover:text-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-medium border border-gray-700 hover:bg-gray-800 rounded-lg transition-all"><span data-i18n="lang_btn">EN / VN</span></button>' +
          '<div id="header-auth" class="flex items-center gap-2 md:gap-3 ml-1"><div class="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div></div>' +
          '<button onclick="toggleMobileMenu()" aria-label="Menu" class="md:hidden text-gray-400 hover:text-white p-1.5 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none transition-colors">' +
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>' +
        '</div></div></div>' +
      '<div id="mobile-menu" class="md:hidden bg-gray-900 border-b border-gray-800 px-4 pt-2 pb-3 space-y-1 shadow-2xl absolute w-full left-0 top-16 z-40 transition-all duration-300 ease-out transform -translate-y-4 opacity-0 pointer-events-none origin-top">' +
        mnav('index.html', 'nav_home', 'Home', 'home') + mnav('tools.html', 'nav_tools', 'Tools Vault', 'tools') + mnav('about.html', 'nav_about', 'About Me', 'about') +
        '<div class="border-t border-gray-800 pt-2 mt-2" id="mobile-auth"></div>' +
      '</div>' +
    '</nav>';
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    var li = function (href, key, label) {
      return '<li><a href="' + href + '" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> <span data-i18n="' + key + '">' + label + '</span></a></li>';
    };
    footer.outerHTML =
    '<footer class="bg-gray-900 border-t border-gray-800 pt-16 pb-8 w-full mt-auto text-left"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">' +
        '<div class="md:col-span-2"><a href="index.html" class="flex items-center gap-3 mb-4 hover:scale-105 transition-transform w-fit"><img src="logo.svg" alt="CoreVault" class="w-10 h-10 shadow-lg shadow-blue-500/20 rounded-xl"><span class="text-2xl font-bold ' + gradText + '">CoreVault</span></a>' +
          '<p class="text-gray-400 text-sm leading-relaxed max-w-sm" data-i18n="hero_desc">Your premier destination for premium tools, optimized resources, and exclusive tech applications.</p></div>' +
        '<div><h4 class="font-bold mb-5 uppercase text-sm tracking-widest text-blue-400" data-i18n="footer_nav">Navigation</h4><ul class="space-y-3 text-sm text-gray-400 font-medium">' +
          li('index.html', 'nav_home', 'Home') + li('tools.html', 'nav_tools', 'Tools Vault') + li('about.html', 'nav_about', 'About Me') + li('auth.html', 'nav_login_reg', 'Login / Register') +
        '</ul></div>' +
        '<div><h4 class="font-bold mb-5 uppercase text-sm tracking-widest text-purple-400" data-i18n="footer_legal">Legal & Support</h4><ul class="space-y-3 text-sm text-gray-400 font-medium">' +
          '<li><a href="legal.html#privacy" data-i18n="legal_privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>' +
          '<li><a href="legal.html#terms" data-i18n="legal_terms" class="hover:text-white transition-colors">Terms of Service</a></li>' +
          '<li><a href="legal.html#contact" data-i18n="legal_contact" class="hover:text-white transition-colors">Contact Admin</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">' +
        '<p data-i18n="footer_copy" class="text-gray-500 text-xs">© 2026 CoreVault Project. Developed by <span class="text-gray-300">LunarRider0</span>.</p>' +
        '<div class="flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 w-full md:w-auto justify-center">' +
          '<span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>' +
          '<span data-i18n="footer_status" class="text-xs text-gray-400 font-bold uppercase tracking-wider">System Online</span></div>' +
      '</div></div></footer>';
  }

  // Nút nổi (FAB)
  if (document.body.getAttribute('data-fab') !== 'off') {
    var ico = function (d) { return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + d + '"></path></svg>'; };
    var item = function (href, key, label, bg, glow, path) {
      return '<a href="' + href + '" class="pointer-events-auto group flex items-center justify-end gap-3"><span class="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" data-i18n="' + key + '">' + label + '</span>' +
        '<div class="w-12 h-12 rounded-full ' + bg + ' text-white flex items-center justify-center ' + glow + ' hover:scale-110 transition-transform">' + ico(path) + '</div></a>';
    };
    var fab = document.createElement('div');
    fab.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none';
    fab.innerHTML =
      '<div id="fab-menu" class="flex flex-col gap-3 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-10 opacity-0 pointer-events-none origin-bottom mr-1">' +
        item('community.html', 'nav_community', 'Community', 'bg-indigo-600', 'shadow-[0_0_15px_rgba(79,70,229,0.5)]', 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z') +
        item('videos.html', 'nav_videos', 'Videos', 'bg-rose-600', 'shadow-[0_0_15px_rgba(225,29,72,0.5)]', 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z') +
        item('asmr.html', 'nav_asmr', 'ASMR Station', 'bg-purple-600', 'shadow-[0_0_15px_rgba(147,51,234,0.5)]', 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z') +
        item('resources.html', 'nav_resources', 'OS & Resources', 'bg-emerald-600', 'shadow-[0_0_15px_rgba(5,150,105,0.5)]', 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4') +
      '</div>' +
      '<div class="flex items-center gap-3 pointer-events-auto">' +
        '<button id="btn-totop" aria-label="Top" class="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 text-gray-400 flex items-center justify-center shadow-lg hover:text-white transition-all opacity-0 pointer-events-none transform translate-y-4">' +
          '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path></svg></button>' +
        '<button id="btn-fab" aria-label="Menu" class="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:bg-blue-500 transition-colors relative z-10">' +
          '<svg id="fab-icon" class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>' +
      '</div>';
    document.body.appendChild(fab);
    document.getElementById('btn-fab').addEventListener('click', toggleFAB);
    document.getElementById('btn-totop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  function toggleFAB(force) {
    var menu = document.getElementById('fab-menu'), icon = document.getElementById('fab-icon');
    if (!menu) return;
    var open = typeof force === 'boolean' ? force : menu.classList.contains('opacity-0');
    menu.classList.toggle('opacity-0', !open); menu.classList.toggle('translate-y-10', !open); menu.classList.toggle('pointer-events-none', !open);
    menu.classList.toggle('opacity-100', open); menu.classList.toggle('translate-y-0', open);
    if (icon) icon.classList.toggle('rotate-45', open);
  }
  window.toggleFAB = toggleFAB;

  function toggleMobileMenu(force) {
    var m = document.getElementById('mobile-menu'); if (!m) return;
    var open = typeof force === 'boolean' ? force : m.classList.contains('opacity-0');
    m.classList.toggle('opacity-0', !open); m.classList.toggle('-translate-y-4', !open); m.classList.toggle('pointer-events-none', !open);
    m.classList.toggle('opacity-100', open); m.classList.toggle('translate-y-0', open); m.classList.toggle('pointer-events-auto', open);
  }
  window.toggleMobileMenu = toggleMobileMenu;

  // Đóng menu khi bấm ra ngoài / nhấn Esc
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#mobile-menu') && !e.target.closest('[onclick="toggleMobileMenu()"]')) toggleMobileMenu(false);
    if (!e.target.closest('#fab-menu') && !e.target.closest('#btn-fab')) toggleFAB(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggleMobileMenu(false); toggleFAB(false); } });

  // Ẩn thanh điều hướng khi cuộn xuống, hiện nút "lên đầu trang"
  var lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, nav = document.getElementById('main-nav'), top = document.getElementById('btn-totop');
      if (top) {
        var show = y > 300;
        top.classList.toggle('opacity-0', !show); top.classList.toggle('translate-y-4', !show); top.classList.toggle('pointer-events-none', !show);
        top.classList.toggle('opacity-100', show); top.classList.toggle('translate-y-0', show); top.classList.toggle('pointer-events-auto', show);
      }
      if (nav) {
        var hide = y > lastY && y > 80;
        nav.classList.toggle('-translate-y-full', hide);
        if (hide) toggleMobileMenu(false);
      }
      lastY = y; ticking = false;
    });
  }, { passive: true });
})();

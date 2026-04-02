(function () {
  const body = document.body;
  const mobileNav = document.querySelector('.mobile-nav');
  const openTrigger = document.querySelector('.wd-header-mobile-nav a');
  const closeTrigger = document.querySelector('.mobile-nav .close-side-widget a');

  if (mobileNav) {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    body.appendChild(overlay);

    const openMenu = function (event) {
      if (event) event.preventDefault();
      mobileNav.classList.add('is-open');
      overlay.classList.add('is-open');
      body.classList.add('mobile-nav-open');
    };

    const closeMenu = function (event) {
      if (event) event.preventDefault();
      mobileNav.classList.remove('is-open');
      overlay.classList.remove('is-open');
      body.classList.remove('mobile-nav-open');
    };

    if (openTrigger) openTrigger.addEventListener('click', openMenu);
    if (closeTrigger) closeTrigger.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    mobileNav.querySelectorAll('.menu-item-has-children').forEach(function (item) {
      const link = item.querySelector(':scope > a');
      const submenu = item.querySelector(':scope > ul, :scope > .wd-dropdown-menu');
      if (!link || !submenu) return;

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'submenu-toggle';
      toggle.setAttribute('aria-label', 'Toggle submenu');
      toggle.textContent = '+';
      link.insertAdjacentElement('afterend', toggle);

      toggle.addEventListener('click', function () {
        const isOpen = item.classList.toggle('is-open');
        toggle.textContent = isOpen ? '−' : '+';
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        event.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (mobileNav && body.classList.contains('mobile-nav-open')) {
        mobileNav.classList.remove('is-open');
        const overlay = document.querySelector('.mobile-nav-overlay');
        if (overlay) overlay.classList.remove('is-open');
        body.classList.remove('mobile-nav-open');
      }
    });
  });
})();
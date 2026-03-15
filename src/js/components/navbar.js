/* =============================================
   navbar.js
   Gère 3 comportements de la navbar :
   1. Devient opaque au scroll
   2. Burger menu mobile (avec accordéon dropdowns)
   3. Fermeture du menu au clic sur un lien
   ============================================= */

export function initNavbar() {

  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  // ----- 1. Navbar opaque au scroll -----
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  // ----- 2. Burger menu mobile -----
  burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('navbar__menu--open');
    burger.classList.toggle('navbar__burger--active');
    burger.setAttribute('aria-expanded', isOpen);

    // Bloque le scroll du body sur mobile (compatible iOS Safari)
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Referme tous les dropdowns quand on ferme le menu
      _closeAllDropdowns();
    }
  });

  // ----- 3. Accordéon dropdowns sur mobile -----
  // Sur mobile, un clic sur le lien parent déplie/replie son dropdown
  navMenu.querySelectorAll('.navbar__item--dropdown').forEach(item => {
    const link     = item.querySelector('.navbar__link--dropdown');
    const dropdown = item.querySelector('.navbar__dropdown');
    if (!link || !dropdown) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth > 900) return; // desktop : comportement hover CSS
      e.preventDefault();
      const isExpanded = dropdown.classList.toggle('navbar__dropdown--open');
      item.classList.toggle('dropdown-active', isExpanded);
    });
  });

  // ----- 4. Fermeture au clic sur un lien -----
  navMenu.querySelectorAll('a:not(.navbar__link--dropdown)').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('navbar__menu--open');
      burger.classList.remove('navbar__burger--active');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      _closeAllDropdowns();
    });
  });

  // ----- Helpers -----
  function _closeAllDropdowns() {
    navMenu.querySelectorAll('.navbar__dropdown--open').forEach(d => {
      d.classList.remove('navbar__dropdown--open');
    });
    navMenu.querySelectorAll('.dropdown-active').forEach(item => {
      item.classList.remove('dropdown-active');
    });
  }

}

/* =============================================
   navbar.js
   Gère 3 comportements de la navbar :
   1. Devient opaque au scroll
   2. Burger menu mobile
   3. Fermeture du menu au clic sur un lien
   ============================================= */

export function initNavbar() {

  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  // ----- 1. Navbar opaque au scroll -----
  // On écoute le scroll de la fenêtre.
  // Dès que l'utilisateur descend de plus de 50px,
  // on ajoute la classe .navbar--scrolled qui
  // applique le fond sombre (défini dans navbar.css).
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true }); // passive:true = meilleure perf scroll

  // ----- 2. Burger menu mobile -----
  // Au clic sur le burger, on toggle les classes
  // qui ouvrent le menu et animent le burger en croix.
  burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('navbar__menu--open');
    burger.classList.toggle('navbar__burger--active');

    // Accessibilité : indique l'état au lecteur d'écran
    burger.setAttribute('aria-expanded', isOpen);

    // Bloque le scroll du body quand le menu est ouvert
    // pour éviter que la page défile derrière le menu
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // ----- 3. Fermeture au clic sur un lien -----
  // Sur mobile, si l'utilisateur clique un lien du menu,
  // on ferme le menu automatiquement.
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('navbar__menu--open');
      burger.classList.remove('navbar__burger--active');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

}

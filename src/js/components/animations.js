/* =============================================
   animations.js
   Gère 3 types d'animations :
   1. Scroll animations (apparition au scroll)
   2. Parallax léger sur le hero
   3. Compteur animé sur les stats
   ============================================= */

// ----- 1. Scroll animations -----
// On utilise l'IntersectionObserver : c'est l'API
// native du navigateur pour détecter quand un élément
// entre dans le viewport. Beaucoup plus performant
// qu'un écouteur scroll classique.
export function initScrollAnimations() {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est visible → on déclenche l'animation
          entry.target.classList.add('is-visible');

          // On arrête d'observer cet élément :
          // l'animation ne se rejoue qu'une seule fois
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,  // déclenche quand 15% de l'élément est visible
      rootMargin: '0px 0px -50px 0px' // décale légèrement le déclenchement
    }
  );

  // On observe tous les éléments qui ont l'attribut [data-animate]
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

}

// ----- 2. Parallax léger sur le hero -----
// À chaque scroll, on déplace légèrement l'image
// de fond vers le bas (effet de profondeur).
// Le facteur 0.4 = l'image bouge 40% moins vite que le scroll.
export function initParallax() {

  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return; // sécurité si l'élément n'existe pas

  window.addEventListener('scroll', () => {
    // requestAnimationFrame = on synchronise avec le rendu
    // du navigateur pour éviter les saccades
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    });
  }, { passive: true });

}

// ----- 3. Compteur animé -----
// Les éléments avec [data-target] voient leur valeur
// s'incrémenter de 0 jusqu'au chiffre cible.
export function initCounters() {

  // On réutilise IntersectionObserver pour ne démarrer
  // le compteur que quand la stat est visible à l'écran
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // une seule fois
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach(el => {
    observer.observe(el);
  });

}

// Fonction utilitaire qui anime un compteur
function animateCounter(el) {
  const target   = parseInt(el.dataset.target); // valeur finale
  const duration = 1800; // durée en millisecondes
  const start    = performance.now();

  function update(now) {
    // Calcule la progression entre 0 et 1
    const progress = Math.min((now - start) / duration, 1);

    // Easing "ease out" : démarre vite, ralentit à la fin
    const eased = 1 - Math.pow(1 - progress, 3);

    // Met à jour l'affichage
    el.textContent = Math.round(eased * target).toLocaleString('fr-FR');

    // Continue l'animation tant qu'on n'est pas à 100%
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

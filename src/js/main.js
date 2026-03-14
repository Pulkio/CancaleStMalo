/* =============================================
   main.js
   Point d'entrée JavaScript.
   Importe et initialise tous les modules.
   L'ordre d'import a son importance :
   navbar en premier car elle est toujours présente
   ============================================= */

import { initNavbar }                                        from './components/navbar.js';
import { initScrollAnimations, initParallax, initCounters } from './components/animations.js';

document.addEventListener('DOMContentLoaded', () => {

  // ✅ Toujours actif (présent sur toutes les pages)
  initNavbar();

  // ✅ Scroll animations : observe les [data-animate]
  // Si aucun élément n'a cet attribut, la fonction
  // ne fait rien → pas d'erreur
  initScrollAnimations();

  // ✅ Parallax : cherche #heroBg
  // Si absent (pages secondaires), le if(!heroBg) return
  // dans la fonction protège contre l'erreur
  initParallax();

  // ✅ Compteurs : cherche les [data-target]
  // Même logique : silencieux si absent
  initCounters();

  console.log('✅ Semi CSM 2026 — JS initialisé');

});

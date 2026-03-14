// ============================================
// Initialisation de la carte Leaflet + GPX
// ============================================

// On attend que le DOM soit prêt
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Création de la carte ---
  // On centre approximativement entre Cancale et Saint-Malo
  const map = L.map('map', {
    center: [48.660, -1.900],
    zoom: 12,
    scrollWheelZoom: false, // Désactivé par défaut pour ne pas gêner le scroll de page
                             // L'utilisateur peut zoomer avec les boutons +/-
  });

  // --- 2. Fond de carte (tuiles) ---
  // On utilise OpenStreetMap, gratuit et sans clé API
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  // --- 3. Chargement du fichier GPX ---
  // Place ton fichier GPX dans /src/assets/parcours.gpx
  new L.GPX('/src/assets/parcours.gpx', {

    async: true, // Chargement asynchrone pour ne pas bloquer la page

    // Personnalisation des marqueurs de départ/arrivée
    marker_options: {
      startIconUrl: null,   // null = on désactive les icônes par défaut
      endIconUrl:   null,   // on va les remplacer par des marqueurs custom
      shadowUrl:    null,
    },

    // Style du tracé GPX sur la carte
    polyline_options: {
      color:     '#017284',   // Bleu foncé de notre charte graphique
      weight:    4,           // Épaisseur du trait
      opacity:   0.9,
      lineCap:   'round',
    },

  })
  // Quand le GPX est bien chargé...
  .on('loaded', (e) => {
    const gpx = e.target;

    // On ajuste automatiquement le zoom pour voir tout le parcours
    map.fitBounds(gpx.getBounds(), { padding: [40, 40] });

    // --- 4. Marqueurs personnalisés ---
    // On récupère les coordonnées de départ et d'arrivée depuis le GPX
    const start = gpx.get_start_latlng();
    const end   = gpx.get_end_latlng();

    // Fonction utilitaire pour créer un marqueur coloré avec label
    const makeIcon = (color, label) => L.divIcon({
      className: '',
      html: `
        <div style="
          background:${color};
          color:#fff;
          font-weight:700;
          font-size:0.75rem;
          padding:4px 8px;
          border-radius:20px;
          white-space:nowrap;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
        ">${label}</div>
      `,
      iconAnchor: [0, 0],
    });

    // Marqueur Départ
    if (start) {
      L.marker(start, { icon: makeIcon('#19ff93', '🏁 Départ · Cancale') })
        .addTo(map)
        .bindPopup('<strong>Départ</strong><br>Avenue de Scissy, Cancale<br>8h00');
    }

    // Marqueur Arrivée
    if (end) {
      L.marker(end, { icon: makeIcon('#017284', '🏆 Arrivée · Saint-Malo') })
        .addTo(map)
        .bindPopup('<strong>Arrivée</strong><br>Esplanade Saint-Vincent<br>Saint-Malo');
    }

    // --- 5. Marqueurs des points clés ---
    // Tu peux ajouter manuellement les côtes et ravitaillements
    // en cherchant les coordonnées GPS sur Google Maps
    const pointsCles = [
      { latlng: [48.672, -1.940], label: '⛰️ Côte du Guesclin', info: 'km 9 · Saint-Coulomb' },
      { latlng: [48.658, -1.960], label: '⛰️ Côte du Lupin',    info: 'km 13 · Saint-Coulomb' },
      { latlng: [48.645, -1.980], label: '⛰️ Côte du Pont',     info: 'km 17 · Saint-Malo'    },
      { latlng: [48.660, -1.920], label: '🥤 Ravitaillement',   info: 'km 5'  },
      { latlng: [48.655, -1.945], label: '🥤 Ravitaillement',   info: 'km 10' },
      { latlng: [48.648, -1.965], label: '🥤 Ravitaillement',   info: 'km 15' },
    ];

    pointsCles.forEach(({ latlng, label, info }) => {
      L.marker(latlng, { icon: makeIcon('rgba(1,114,132,0.85)', label) })
        .addTo(map)
        .bindPopup(`<strong>${label}</strong><br>${info}`);
    });

  })
  .on('error', (e) => {
    // Si le GPX ne charge pas, on log l'erreur discrètement
    console.warn('Erreur chargement GPX :', e);
  })
  .addTo(map);

});

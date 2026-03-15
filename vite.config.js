// vite.config.js
// Ce fichier configure le comportement de Vite pour notre projet

import { resolve } from 'path'

export default {
  // Le dossier "public" contient les fichiers statiques (images, favicon, sitemap…)
  // Vite les copie tels quels dans le build final
  publicDir: 'public',

  // Configuration du serveur de développement local
  server: {
    port: 3000,        // Le site sera accessible sur http://localhost:3000
    open: true,        // Ouvre automatiquement le navigateur au démarrage
  },

  // Configuration de la compilation finale (npm run build)
  build: {
    outDir: 'dist',    // Les fichiers optimisés iront dans un dossier "dist"
    emptyOutDir: true, // On vide "dist" avant chaque nouveau build

    rollupOptions: {
      // Déclare toutes les pages HTML comme points d'entrée.
      // Vite traite chaque page, bundle son CSS/JS et préserve
      // l'arborescence dans dist/ (les liens /src/pages/... restent valides).
      input: {
        main:                    resolve(__dirname, 'index.html'),
        inscriptions:            resolve(__dirname, 'src/pages/inscriptions-individuelles.html'),
        challenge:               resolve(__dirname, 'src/pages/challenge-entreprises.html'),
        parcours:                resolve(__dirname, 'src/pages/parcours.html'),
        resultats:               resolve(__dirname, 'src/pages/resultats.html'),
        navettes:                resolve(__dirname, 'src/pages/navettes.html'),
        parking:                 resolve(__dirname, 'src/pages/parking.html'),
        benevoles:               resolve(__dirname, 'src/pages/benevoles.html'),
        classements:             resolve(__dirname, 'src/pages/classements.html'),
        dossards:                resolve(__dirname, 'src/pages/dossards.html'),
        engagements:             resolve(__dirname, 'src/pages/engagements.html'),
        photosVideos:            resolve(__dirname, 'src/pages/photos-videos.html'),
      }
    }
  }
}

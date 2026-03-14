// vite.config.js
// Ce fichier configure le comportement de Vite pour notre projet

export default {
  // Le dossier "public" contient les fichiers statiques (images, favicon...)
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
  }
}

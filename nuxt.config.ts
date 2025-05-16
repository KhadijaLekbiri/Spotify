// export default defineNuxtConfig({
//   compatibilityDate: '2025-05-10',
//   devtools: { enabled: true },
//   modules: [
//     '@nuxtjs/tailwindcss',
//     'nuxt-icon'
//   ],
//   imports: {
//     autoImport: true, // Automatically imports composables

//     dirs: [
//       'composables', // Default Nuxt composables folder
//       'components',
//       'pages'
//     ],
//   },
//   runtimeConfig: {
//     spotify: {
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       redirectUri: process.env.SPOTIFY_REDIRECT_URI,
//     },
//   },
//   // runtimeConfig: {
//   //   public: {
//   //     spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
//   //     spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   //     spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI
//   //   }
//   // }
// })

// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  runtimeConfig: {
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET, // private by default
    public: {
      spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    }
  },
  vite: {
  server: {
    hmr: {
      protocol: 'wss',              // Use Secure WebSocket for HTTPS
      host: 'https://dainty-sorbet-0324ac.netlify.app', // Your Ngrok domain
      clientPort: 443,              // HTTPS default port
      timeout: 30000                // Increase timeout for stability
    },
    watch: {
      usePolling: true,             // Force file change detection
      interval: 100,                // Polling interval (ms)
    },
    allowedHosts: [
      'https://dainty-sorbet-0324ac.netlify.app', // Allow your Ngrok domain
    ],
  },
}

  // vite:{
  
  //   server: {
  //     hmr: {
  //       protocol: 'ws',              // Use 'wss' if you're behind HTTPS (e.g., Ngrok)
  //       host: 'localhost',           // You can try '0.0.0.0' if localhost fails
  //       port: 24678,                 // Default Vite HMR port
  //       overlay: true,
  //       timeout: 30000               // Increase timeout for stability
  //     },
  //     watch: {
  //       usePolling: true,           // Force file change detection (great for WSL, Docker, Ngrok, etc.)
  //       interval: 100               // Polling interval (ms) for faster reload
  //     },
  //     allowedHosts: [
  //       '3b07-41-137-204-13.ngrok-free.app', // Make sure this matches your actual ngrok subdomain
  //     ],
  //   },

  // }

})
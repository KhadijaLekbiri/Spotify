<template>
  <footer class="bg-zinc-900 text-zinc-300 pt-12 px-8 pb-0">
    <div class="max-w-7xl mx-auto">
      <!-- Top row: Logo and Social Icons -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="text-white text-3xl font-bold mb-4 md:mb-0">
          <span class="text-green-500">Spotify</span>
        </div>
        <div class="flex space-x-4">
          <a href="https://instagram.com/spotify" target="_blank" class="hover:text-white transition-colors bg-zinc-700 rounded-full p-2">
            <Icon name="ri:instagram-fill" size="22" />
          </a>
          <a href="https://twitter.com/spotify" target="_blank" class="hover:text-white transition-colors bg-zinc-700 rounded-full p-2">
            <Icon name="ri:twitter-fill" size="22" />
          </a>
          <a href="https://facebook.com/spotify" target="_blank" class="hover:text-white transition-colors bg-zinc-700 rounded-full p-2">
            <Icon name="ri:facebook-fill" size="22" />
          </a>
        </div>
      </div>

      <!-- Main links row -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
        <!-- Société -->
        <div>
          <h3 class="text-white font-bold mb-4">Société</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">A propos</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Offres d'emploi</a></li>
            <li><a href="#" class="hover:text-white transition-colors">For the Record</a></li>
          </ul>
        </div>
        <!-- Communautés -->
        <div>
          <h3 class="text-white font-bold mb-4">Communautés</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Espace artistes</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Développeurs</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Campagnes publicitaires</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Investisseurs</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Fournisseurs</a></li>
          </ul>
        </div>
        <!-- Liens utiles -->
        <div>
          <h3 class="text-white font-bold mb-4">Liens utiles</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Assistance</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Appli mobile gratuite</a></li>
          </ul>
        </div>
        <!-- Abonnements Spotify -->
        <div>
          <h3 class="text-white font-bold mb-4">Abonnements Spotify</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Premium Personnel</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Premium Duo</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Premium Famille</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Premium Étudiants</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Spotify Free</a></li>
          </ul>
        </div>
      </div>

      <!-- Legal and copyright row -->
      <div class="border-t border-zinc-700 pt-4 pb-6 flex flex-col md:flex-row md:items-center md:justify-between text-sm">
        <div class="flex flex-wrap gap-x-6 gap-y-2 mb-2 md:mb-0">
          <a href="#" class="hover:text-white transition-colors">Légal</a>
          <a href="#" class="hover:text-white transition-colors">Centre de sécurité et de confidentialité</a>
          <a href="#" class="hover:text-white transition-colors">Protection des données</a>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
          <a href="#" class="hover:text-white transition-colors">À propos des pubs</a>
          <a href="#" class="hover:text-white transition-colors">Accessibilité</a>
        </div>
        <div class="text-zinc-400">© 2025 Spotify AB</div>
      </div>
    </div>
  </footer>
</template> 
<script setup>
import { ref } from 'vue'
import { useSpotifySearch } from '@/composables/spotifySearch'

const { searchResults, loading, error, searchSpotify } = useSpotifySearch()
const searchQuery = ref('')

const handleSearch = () => {
  searchSpotify(searchQuery.value)
}
</script>

<template>
  <div class="p-4">
    <div class="max-w-2xl mx-auto">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for songs, artists, albums..."
          class="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        <p class="mt-2 text-sm text-gray-400">Searching...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center py-8">
        {{ error }}
      </div>

      <!-- Search Results -->
      <div v-else-if="searchResults" class="mt-8">
        <!-- Tracks -->
        <div v-if="searchResults.tracks?.items.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">Songs</h2>
          <div class="space-y-2">
            <div
              v-for="track in searchResults.tracks.items"
              :key="track.id"
              class="flex items-center gap-4 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer"
            >
              <img
                :src="track.album.images[0]?.url"
                :alt="track.name"
                class="w-12 h-12 rounded"
              />
              <div>
                <h3 class="font-medium">{{ track.name }}</h3>
                <p class="text-sm text-gray-400">
                  {{ track.artists.map((artist: any) => artist.name).join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Artists -->
        <div v-if="searchResults.artists?.items.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">Artists</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="artist in searchResults.artists.items"
              :key="artist.id"
              class="text-center"
            >
              <img
                :src="artist.images[0]?.url"
                :alt="artist.name"
                class="w-32 h-32 rounded-full mx-auto mb-2"
              />
              <h3 class="font-medium">{{ artist.name }}</h3>
              <p class="text-sm text-gray-400">Artist</p>
            </div>
          </div>
        </div>

        <!-- Albums -->
        <div v-if="searchResults.albums?.items.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">Albums</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="album in searchResults.albums.items"
              :key="album.id"
              class="text-center"
            >
              <img
                :src="album.images[0]?.url"
                :alt="album.name"
                class="w-32 h-32 rounded-lg mx-auto mb-2"
              />
              <h3 class="font-medium">{{ album.name }}</h3>
              <p class="text-sm text-gray-400">{{ album.artists[0].name }}</p>
            </div>
          </div>
        </div>

        <!-- Playlists -->
        <div v-if="searchResults.playlists?.items.length" class="mb-8">
          <h2 class="text-xl font-bold mb-4">Playlists</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="playlist in searchResults.playlists.items"
              :key="playlist.id"
              class="text-center"
            >
              <img
                :src="playlist.images[0]?.url"
                :alt="playlist.name"
                class="w-32 h-32 rounded-lg mx-auto mb-2"
              />
              <h3 class="font-medium">{{ playlist.name }}</h3>
              <p class="text-sm text-gray-400">By {{ playlist.owner.display_name }}</p>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div
          v-if="
            !searchResults.tracks?.items.length &&
            !searchResults.artists?.items.length &&
            !searchResults.albums?.items.length &&
            !searchResults.playlists?.items.length
          "
          class="text-center py-8 text-gray-400"
        >
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

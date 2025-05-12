<script setup>
import { ref, onMounted } from 'vue'
import { useSpotifySearch } from '@/composables/spotifySearch'
import { useSpotifyGenres } from '@/composables/useSpotifyGenres'

const { searchResults, loading: searchLoading, error: searchError, searchSpotify } = useSpotifySearch()
const { genres, loading: genresLoading, error: genresError, fetchGenres } = useSpotifyGenres()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    searchSpotify(searchQuery.value)
  }
}

onMounted(() => {
  fetchGenres()
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <header class="flex gap-4 items-center sticky -mx-4 px-4 -top-2 bg-zinc-800 py-2">
        <div class="flex gap-2">
          <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
            <Icon name="ri:arrow-left-s-line" size="24" />
          </button>
          <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
            <Icon name="ri:arrow-right-s-line" size="24" />
          </button>
        </div>
        <div class="relative flex-grow max-w-[400px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="What do you want to listen to?"
            class="w-full px-4 py-2 bg-zinc-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <Icon name="ri:search-line" size="20" />
          </button>
        </div>
        <div class="flex-grow"></div>
        <a
          href="https://open.spotify.com/intl-fr/premium"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 inline-flex gap-2 items-center px-4 py-1.5 tracking-wide font-semibold text-sm bg-zinc-200 border-zinc-200 text-zinc-900 rounded-full justify-center border hover:bg-zinc-300 transition-colors"
        >
          Explore Premium
        </a>
        <a
          href="https://open.spotify.com/download"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 inline-flex gap-2 items-center px-4 py-1.5 tracking-wide font-semibold text-sm bg-zinc-950 border-zinc-950 text-zinc-200 rounded-full justify-center border hover:bg-zinc-900 transition-colors"
        >
          <Icon name="ri:download-line" size="16" />
          Install App
        </a>
        <button>
          <img
            src="https://picsum.photos/50/50?random=1"
            alt="Profile"
            class="w-8 h-8 rounded-full"
          />
        </button>
      </header>

      <!-- Search Results -->
      <div v-if="searchQuery && (searchLoading || searchResults || searchError)" class="mt-6">
        <!-- Loading State -->
        <div v-if="searchLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p class="mt-2 text-sm text-gray-400">Searching...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="searchError" class="text-red-500 text-center py-8">
          {{ searchError }}
        </div>

        <!-- Search Results -->
        <div v-else-if="searchResults" class="space-y-8">
          <!-- Tracks -->
          <div v-if="searchResults.tracks?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Songs</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div
                v-for="track in searchResults.tracks.items"
                :key="track.id"
                class="p-4 rounded-md bg-zinc-900/50 hover:bg-zinc-800 transition-colors group cursor-pointer"
              >
                <div class="relative">
                  <img
                    :src="track.album.images[0]?.url"
                    :alt="track.name"
                    class="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <button
                    class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 text-black grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl"
                  >
                    <Icon name="ri:play-fill" size="24" />
                  </button>
                </div>
                <h3 class="font-medium truncate">{{ track.name }}</h3>
                <p class="text-sm text-gray-400 truncate">
                  {{ track.artists.map(artist => artist.name).join(', ') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Artists -->
          <div v-if="searchResults.artists?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Artists</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div
                v-for="artist in searchResults.artists.items"
                :key="artist.id"
                class="p-4 rounded-md bg-zinc-900/50 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <img
                  :src="artist.images[0]?.url"
                  :alt="artist.name"
                  class="w-full aspect-square object-cover rounded-full mb-4"
                />
                <h3 class="font-medium text-center">{{ artist.name }}</h3>
                <p class="text-sm text-gray-400 text-center">Artist</p>
              </div>
            </div>
          </div>

          <!-- Albums -->
          <div v-if="searchResults.albums?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Albums</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div
                v-for="album in searchResults.albums.items"
                :key="album.id"
                class="p-4 rounded-md bg-zinc-900/50 hover:bg-zinc-800 transition-colors group cursor-pointer"
              >
                <div class="relative">
                  <img
                    :src="album.images[0]?.url"
                    :alt="album.name"
                    class="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <button
                    class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 text-black grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl"
                  >
                    <Icon name="ri:play-fill" size="24" />
                  </button>
                </div>
                <h3 class="font-medium truncate">{{ album.name }}</h3>
                <p class="text-sm text-gray-400 truncate">
                  {{ album.artists.map(artist => artist.name).join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Browse All Section (shown when no search) -->
      <div v-else class="mt-6">
        <!-- Loading State -->
        <div v-if="genresLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p class="mt-2 text-sm text-gray-400">Loading genres...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="genresError" class="text-red-500 text-center py-8">
          {{ genresError }}
        </div>

        <!-- Genres Grid -->
        <div v-else>
          <h1 class="text-2xl font-bold mb-6">Browse all</h1>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <NuxtLink
              v-for="genre in genres"
              :key="genre.id"
              :to="`https://open.spotify.com/genre/${genre.id}`"
              class="relative aspect-square overflow-hidden cursor-pointer group transition-transform duration-200"
              :style="{
                background: genre.color ? undefined : '#282828',
                backgroundColor: genre.color ? undefined : '#282828',
              }"
              :class="[
                'flex flex-col justify-between',
                'hover:scale-105 hover:brightness-110',
                genre.color || 'bg-zinc-800',
                'rounded-none',
                'shadow-none',
                'transition-all',
                'p-4'
              ]"
            >
              <span class="text-white font-bold text-lg md:text-xl lg:text-2xl leading-tight z-10">
                {{ genre.name }}
              </span>
              <img
                :src="genre.image"
                :alt="genre.name"
                class="absolute bottom-2 right-2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rotate-[25deg] shadow-xl z-0 pointer-events-none select-none"
                draggable="false"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.group:hover {
  z-index: 2;
}
</style>

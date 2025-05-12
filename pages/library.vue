
<script setup>
import { ref, onMounted } from 'vue'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'
import { useSpotifyPlaylist } from '@/composables/useSpotifyPlaylist'
import { useSpotifyLibrary } from '@/composables/useSpotifyLibrary'
import MediaCard from '@/components/MediaCard.vue'
import Footer from '@/components/Footer.vue'

const { accessToken } = useSpotifyAuth()
const { playlists, loading: playlistsLoading, getUserPlaylists } = useSpotifyPlaylist()
const { albums, tracks, albumsLoading, tracksLoading, getUserAlbums, getUserTracks } = useSpotifyLibrary()

onMounted(async () => {
  if (!accessToken.value) {
    error.value = 'Please log in to view your library'
    return
  }

  try {
    console.log('Fetching Spotify data...')
    await Promise.all([
      getUserPlaylists(accessToken.value),
      getUserAlbums(accessToken.value),
      getUserTracks(accessToken.value)
    ])
    console.log('Playlists:', playlists.value)
    console.log('Albums:', albums.value)
    console.log('Tracks:', tracks.value)
  } catch (err) {
    console.error('Error fetching library data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch library data'
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <!-- Header (same as /Home) -->
      <header class="flex gap-4 items-center sticky -mx-4 px-4 -top-2 bg-zinc-800 py-2">
        <div class="flex gap-2">
          <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
            <Icon name="ri:arrow-left-s-line" size="24" />
          </button>
          <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
            <Icon name="ri:arrow-right-s-line" size="24" />
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

      <!-- Playlists Section -->
      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Your Playlists</h2>
        <div v-if="playlistsLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-zinc-800 rounded-md aspect-square"></div>
            <div class="h-4 bg-zinc-800 rounded mt-3 w-3/4"></div>
            <div class="h-3 bg-zinc-800 rounded mt-2 w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="playlist in playlists"
            :key="playlist.id"
            :image="playlist.images[0]?.url"
            :imageAlt="playlist.name"
            :title="playlist.name"
            :description="playlist.description"
          />
        </div>
      </div>

      <!-- Albums Section -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-4">Your Albums</h2>
        <div v-if="albumsLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-zinc-800 rounded-md aspect-square"></div>
            <div class="h-4 bg-zinc-800 rounded mt-3 w-3/4"></div>
            <div class="h-3 bg-zinc-800 rounded mt-2 w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="album in albums"
            :key="album.id"
            :image="album.images[0]?.url"
            :imageAlt="album.name"
            :title="album.name"
            :description="album.artists.map(a => a.name).join(', ')"
          >
            <a
              :href="`https://open.spotify.com/artist/${a.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="artist-card"
            >
              {{ a.name }}
            </a>
          </MediaCard>
        </div>
      </div>

      <!-- Liked Songs Section -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-4">Liked Songs</h2>
        <div v-if="tracksLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-zinc-800 rounded-md aspect-square"></div>
            <div class="h-4 bg-zinc-800 rounded mt-3 w-3/4"></div>
            <div class="h-3 bg-zinc-800 rounded mt-2 w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="track in tracks"
            :key="track.id"
            :image="track.album.images[0]?.url"
            :imageAlt="track.name"
            :title="track.name"
            :description="track.artists.map(a => a.name).join(', ')"
          >
            <a
              :href="`https://open.spotify.com/artist/${a.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="artist-card"
            >
              {{ a.name }}
            </a>
          </MediaCard>
        </div>
      </div>

      <Footer />
    </NuxtLayout>
  </div>
</template> 
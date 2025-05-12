<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'

const route = useRoute()
const { accessToken } = useSpotifyAuth()
const playlist = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}`, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    })
    if (!res.ok) throw new Error('Failed to fetch playlist')
    playlist.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div class="flex gap-6 items-center mb-8">
        <img :src="playlist.images[0]?.url || 'https://via.placeholder.com/300?text=Playlist'" :alt="playlist.name" class="w-40 h-40 object-cover rounded-md bg-zinc-800" />
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ playlist.name }}</h1>
          <p class="text-zinc-400 mb-2">{{ playlist.description }}</p>
          <p class="text-sm text-zinc-500">By {{ playlist.owner.display_name }}</p>
        </div>
      </div>
      <h2 class="text-xl font-semibold mb-4">Tracks</h2>
      <ul class="mb-8">
        <li v-for="track in playlist.tracks.items" :key="track.track.id" class="mb-2">
          {{ track.track.name }} - {{ track.track.artists.map(a => a.name).join(', ') }}
        </li>
      </ul>
      <!-- Placeholder for add track UI -->
      <div class="bg-zinc-900 p-4 rounded-md">
        <h3 class="font-semibold mb-2">Add a track (coming soon)</h3>
        <!-- You can add a form here to add tracks by URI or search -->
      </div>
    </div>
  </div>
</template> 
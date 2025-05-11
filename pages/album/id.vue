<script setup>
import { useRoute } from 'vue-router'
import { useSpotifyAlbum } from '@/composables/spotifyAlbum'

const route = useRoute()
const albumId = route.params.id
const { getAlbum } = useSpotifyAlbum()
const album = ref(null)

onMounted(async () => {
  album.value = await getAlbum(albumId)
})
</script>

<template>
  <div v-if="album">
    <h1>{{ album.name }}</h1>
    <img :src="album.images[0].url" :alt="album.name" />
    <ul>
      <li v-for="track in album.tracks.items" :key="track.id">
        {{ track.name }}
      </li>
    </ul>
  </div>
</template>

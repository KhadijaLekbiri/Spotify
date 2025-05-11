<script setup>
import { useRoute } from 'vue-router'
import { useSpotifyArtist } from '@/composables/spotifyArtist'

const route = useRoute()
const artistId = route.params.id
const { getArtist } = useSpotifyArtist()
const artist = ref(null)

onMounted(async () => {
  artist.value = await getArtist(artistId)
})
</script>

<template>
  <div v-if="artist">
    <h1>{{ artist.name }}</h1>
    <img :src="artist.images[0].url" :alt="artist.name" />
    <p>{{ artist.genres.join(', ') }}</p>
  </div>
</template>

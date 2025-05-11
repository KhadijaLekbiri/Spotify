<script setup>
import { ref, onMounted } from 'vue';
import { useSpotifyAuth } from '@/composables/useSpotifyAuth';

const { accessToken } = useSpotifyAuth();
const playlists = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchLibrary = async () => {
  if (!accessToken.value) {
    error.value = 'Please log in to view your library';
    loading.value = false;
    return;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch library');
    }

    const data = await response.json();
    playlists.value = data.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLibrary();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Your Library</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      <p class="mt-2 text-sm text-gray-400">Loading your library...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>

    <!-- Library Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors"
      >
        <img
          :src="playlist.images[0]?.url || 'https://via.placeholder.com/150'"
          :alt="playlist.name"
          class="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 class="font-semibold">{{ playlist.name }}</h3>
        <p class="text-sm text-gray-400">{{ playlist.tracks.total }} tracks</p>
      </div>
    </div>
  </div>
</template> 
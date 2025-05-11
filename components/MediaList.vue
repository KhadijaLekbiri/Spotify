<script setup lang="ts">
import { onMounted, onUnmounted, watch, computed, ref } from 'vue';
import { useSpotifyPlaylist } from '@/composables/useSpotifyPlaylist';
import { useSpotifyLibrary } from '@/composables/useSpotifyLibrary';
import { useSpotifyAuth } from '@/composables/useSpotifyAuth';

const { playlists, loading, error, hasMore, getUserPlaylists, loadMore, reset } = useSpotifyPlaylist();
const { albums, tracks, albumsLoading, tracksLoading, albumsError, tracksError, getUserAlbums, getUserTracks } = useSpotifyLibrary();
const { accessToken, error: authError, isAuthenticating, getAccessToken, initiateLogin } = useSpotifyAuth();

const tabs = [
  { text: 'All', value: 'all' },
  { text: 'Playlists', value: 'playlist' },
  { text: 'Albums', value: 'album' },
  { text: 'Songs', value: 'track' },
  { text: 'Podcasts', value: 'podcast' },
  { text: 'Shows', value: 'show' }
];
const selectedCategory = ref<'all' | 'playlist' | 'album' | 'track' | 'podcast' | 'show'>('all');
const searchQuery = ref('');

const fetchAll = async () => {
  try {
    const token = await getAccessToken();
    if (!token) return;
    await Promise.all([
      getUserPlaylists(token),
      getUserAlbums(token),
      getUserTracks(token)
    ]);
  } catch (err) {
    console.error('Failed to fetch library:', err);
  }
};

watch(accessToken, (newToken) => {
  if (newToken) {
    fetchAll();
  }
});

const handleScroll = async (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target) return;
  const { scrollTop, scrollHeight, clientHeight } = target;
  if (scrollHeight - scrollTop - clientHeight < 100) {
    const token = accessToken.value;
    if (token && hasMore.value && !loading.value) {
      await loadMore(token);
    }
  }
};

onMounted(async () => {
  await fetchAll();
  const container = document.querySelector('.playlist-container');
  if (container) {
    container.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  const container = document.querySelector('.playlist-container');
  if (container) {
    container.removeEventListener('scroll', handleScroll);
  }
  reset();
});

// Unified list: playlists, then albums, then tracks
const unifiedList = computed(() => {
  const list: any[] = [];
  playlists.value.forEach(item => list.push({ ...item, _type: 'playlist' }));
  albums.value.forEach(item => list.push({ ...item, _type: 'album' }));
  tracks.value.forEach(item => list.push({ ...item, _type: 'track' }));
  return list;
});

const filteredList = computed(() => {
  let filtered = unifiedList.value;
  
  // First filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(item => item._type === selectedCategory.value);
  }
  
  // Then filter by search query if it exists
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(item => {
      // Search in name
      if (item.name.toLowerCase().includes(query)) return true;
      
      // Search in artists for albums and tracks
      if (item.artists && item.artists.some(artist => 
        artist.name.toLowerCase().includes(query)
      )) return true;
      
      // Search in description for playlists
      if (item.description && item.description.toLowerCase().includes(query)) return true;
      
      return false;
    });
  }
  
  return filtered;
});

// Expose searchQuery to parent component
defineExpose({
  searchQuery
});
</script>

<template>
  <div class="mt-3 max-h-64 overflow-y-auto space-y-3 scroll-smooth playlist-container">
    <!-- Category Filter Buttons styled like Sidebar.vue -->
    <div class="flex gap-2 mt-3 scroll">
      <button
        v-for="tab in tabs"
        :key="tab.text"
        class="px-3 py-2 shrink-0 text-sm font-semibold rounded-full"
        :class="selectedCategory === tab.value ? 'bg-green-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'"
        @click="selectedCategory = tab.value"
      >
        {{ tab.text }}
      </button>
    </div>
    

    <!-- Loading State -->
    <div v-if="isAuthenticating" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      <p class="mt-2 text-sm text-gray-400">Authenticating...</p>
    </div>

    <!-- No Auth State -->
    <div v-else-if="!accessToken" class="text-center py-8 px-4">
      <div class="bg-zinc-800 rounded-lg p-6">
        <Icon name="ri:spotify-fill" class="text-green-500 text-4xl mb-4" />
        <h3 class="text-lg font-semibold mb-2">Connect to Spotify</h3>
        <p class="text-gray-400 mb-4">Please log in to view your library</p>
        <button 
          @click="initiateLogin"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Log in with Spotify
        </button>
      </div>
    </div>

    <!-- Auth Error State -->
    <div v-else-if="authError" class="text-red-500 text-center py-4">
      {{ authError }}
    </div>

    <!-- Loading State -->
    <div v-else-if="(loading && !playlists.length) || (albumsLoading && !albums.length) || (tracksLoading && !tracks.length)" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      <p class="mt-2 text-sm text-gray-400">Loading your library...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || albumsError || tracksError" class="text-red-500 text-center py-4">
      <div v-if="error">{{ error }}</div>
      <div v-if="albumsError">{{ albumsError }}</div>
      <div v-if="tracksError">{{ tracksError }}</div>
    </div>

    <!-- Filtered List -->
    <div v-else>
      <div
        v-for="item in filteredList"
        :key="item._type + '-' + item.id"
        class="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
      >
        <!-- Image -->
        <img
          :src="item._type === 'track' ? item.album.images[0]?.url : item.images[0]?.url || 'https://via.placeholder.com/50'"
          :alt="item.name"
          class="w-12 h-12 rounded-md object-cover"
        />
        <!-- Info -->
        <div class="flex-grow min-w-0">
          <h3 class="font-medium truncate">{{ item.name }}</h3>
          <p class="text-sm text-gray-400 truncate">
            <template v-if="item._type === 'playlist'">
              Playlist • {{ item.tracks.total }} songs
            </template>
            <template v-else-if="item._type === 'album'">
              Album • {{ item.artists.map(a => a.name).join(', ') }}
            </template>
            <template v-else-if="item._type === 'track'">
              Song • {{ item.artists.map(a => a.name).join(', ') }}
            </template>
          </p>
        </div>
      </div>
      <!-- Loading More Indicator for playlists -->
      <div v-if="loading && playlists.length" class="text-center py-2">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}

.overflow-y-auto {
  overflow-y: auto;
}

.max-h-64 {
  max-height: 16rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.mt-3 {
  margin-top: 1rem;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

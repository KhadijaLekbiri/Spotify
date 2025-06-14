<script setup lang="ts">
import { useSpotifyAuth } from '@/composables/useSpotifyAuth';
import MediaCard from '@/components/MediaCard.vue';
import Footer from '@/components/Footer.vue';
import ArtistInfo from '@/components/ArtistInfo.vue';
import { ref, onMounted } from 'vue';

const { accessToken } = useSpotifyAuth();
const recentlyPlayed = ref([]);
const loading = ref(true);
const topArtists = ref([]);
const loadingArtists = ref(true);
const popularArtists = ref([]);
const loadingPopular = ref(true);
const userProfile = ref(null);

const scope = 'playlist-read-private playlist-read-collaborative playlist-read-public';

const fetchRecentlyPlayed = async () => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });
    const data = await response.json();
    recentlyPlayed.value = data.items;
  } catch (error) {
    console.error('Error fetching recently played:', error);
  } finally {
    loading.value = false;
  }
};

const fetchTopArtists = async () => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=4', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });
    const data = await response.json();
    topArtists.value = data.items;
  } catch (error) {
    console.error('Error fetching top artists:', error);
  } finally {
    loadingArtists.value = false;
  }
};

const fetchPopularArtists = async () => {
  try {
    // Using a valid playlist ID from Spotify's Global Top 50
    const playlistId = '37i9dQZEVXbLRQDuF5jeBp';
    console.log('Fetching data from Spotify API...');
    
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log('API Data:', data);

    const artistMap = new Map();
    data.items.forEach(item => {
      const artist = item?.track?.artists?.[0];
      if (artist && !artistMap.has(artist.id)) {
        artistMap.set(artist.id, artist);
      }
    });

    popularArtists.value = Array.from(artistMap.values());
    console.log('Popular Artists:', popularArtists.value);
  } catch (error) {
    console.error('Error fetching popular artists:', error);
    loadingPopular.value = false;
  } finally {
    loadingPopular.value = false;
  }
};

async function fetchUserProfile() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    userProfile.value = await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

onMounted(() => {
  if (accessToken.value) {
    fetchRecentlyPlayed();
    fetchPopularArtists();
    fetchUserProfile();
  }
});
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
            :src="userProfile?.images?.[0]?.url || 'https://upload.wikimedia.org/wikipedia/commons/7/70/Spotify_icon.svg'"
            :alt="userProfile?.display_name || 'Profile'"
            class="w-8 h-8 rounded-full object-cover"
          />
        </button>
      </header>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Recently Played</h2>
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-zinc-800 rounded-md aspect-square"></div>
            <div class="h-4 bg-zinc-800 rounded mt-3 w-3/4"></div>
            <div class="h-3 bg-zinc-800 rounded mt-2 w-1/2"></div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MediaCard
            v-for="item in recentlyPlayed"
            :key="item.track.id"
            :image="item.track.album.images[0]?.url"
            :imageAlt="item.track.album.name"
            :title="item.track.name"
            :description="item.track.artists.map(artist => artist.name).join(', ')"
          />
        </div>
      </div>

      <Footer />
    </NuxtLayout>
  </div>
</template>

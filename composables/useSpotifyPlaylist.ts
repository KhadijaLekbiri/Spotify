// composables/useSpotifyPlaylist.ts
import { ref } from 'vue';

// Define an interface for the playlist structure
interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
  uri: string;
  owner: {
    display_name: string;
  };
}

export const useSpotifyPlaylist = () => {
  const playlists = ref<Playlist[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const hasMore = ref(true);
  const nextUrl = ref<string | null>(null);

  const getUserPlaylists = async (accessToken: string, limit: number = 20) => {
    if (!accessToken) {
      error.value = 'No access token provided';
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      // If we have a next URL, use it; otherwise, start from the beginning
      const url = nextUrl.value || `https://api.spotify.com/v1/me/playlists?limit=${limit}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch playlists');
      }

      const data = await response.json();

      // Update pagination info
      nextUrl.value = data.next;
      hasMore.value = !!data.next;

      // If this is the first page, replace the playlists; otherwise, append
      if (!nextUrl.value) {
        playlists.value = data.items;
      } else {
        playlists.value = [...playlists.value, ...data.items];
      }

      return data.items;
    } catch (err) {
      console.error('Error getting playlists:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async (accessToken: string) => {
    if (hasMore.value && !loading.value) {
      await getUserPlaylists(accessToken);
    }
  };

  const reset = () => {
    playlists.value = [];
    error.value = null;
    hasMore.value = true;
    nextUrl.value = null;
  };

  const getPlaylistData = async (accessToken: string, playlistId: string) => {
    const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;
    try {
      loading.value = true;
      error.value = null;

      const response = await fetch(playlistEndpoint, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch playlist data');
      }

      const data = await response.json();
      // Add the new playlist to the existing array instead of replacing
      playlists.value = [...playlists.value, data];
      return data;
    } catch (err) {
      console.error('Error getting playlist data:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    playlists,
    loading,
    error,
    hasMore,
    getUserPlaylists,
    loadMore,
    reset,
    getPlaylistData
  };
};

import { ref } from 'vue';
import { useSpotifyAuth } from './useSpotifyAuth';

export const useSpotifySearch = () => {
    const { accessToken } = useSpotifyAuth();
    const searchResults = ref<any>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const searchSpotify = async (query: string) => {
        if (!query.trim()) {
            searchResults.value = null;
            return;
        }

        if (!accessToken.value) {
            error.value = 'Please log in to search';
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album,playlist&limit=20`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to search Spotify');
            }

            const data = await response.json();
            searchResults.value = data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred while searching';
            searchResults.value = null;
        } finally {
            loading.value = false;
        }
    };

    return {
        searchResults,
        loading,
        error,
        searchSpotify,
    };
}; 
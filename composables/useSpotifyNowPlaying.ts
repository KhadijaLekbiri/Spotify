import { ref } from 'vue';

interface Artist {
    name: string;
}

interface Album {
    images: { url: string }[];
}

interface Track {
    name: string;
    artists: Artist[];
    album: Album;
}

export function useSpotifyNowPlaying() {
    const currentTrack = ref<Track | null>(null);
    const progress = ref(0);
    const isPlaying = ref(false);
    const error = ref<string | null>(null);
    let pollInterval: number | null = null;

    async function fetchNowPlaying(token: string) {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 204) {
                currentTrack.value = null;
                progress.value = 0;
                isPlaying.value = false;
                error.value = null;
                return;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch now playing');
            }
            const data = await response.json();
            currentTrack.value = data.item;
            progress.value = (data.progress_ms / data.item.duration_ms) * 100;
            isPlaying.value = data.is_playing;
            error.value = null;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred';
        }
    }

    function startPolling(token: string) {
        pollInterval = window.setInterval(() => {
            fetchNowPlaying(token);
        }, 1000);
    }

    function stopPolling() {
        if (pollInterval !== null) {
            clearInterval(pollInterval);
            pollInterval = null;
        }
    }

    return {
        currentTrack,
        progress,
        isPlaying,
        error,
        fetchNowPlaying,
        startPolling,
        stopPolling,
    };
} 
// import { ref } from 'vue';

// export const useSpotifyLibrary = () => {
//     const albums = ref<any[]>([]);
//     const tracks = ref<any[]>([]);
//     const albumsLoading = ref(false);
//     const tracksLoading = ref(false);
//     const albumsError = ref<string | null>(null);
//     const tracksError = ref<string | null>(null);

//     const getUserAlbums = async (accessToken: string) => {
//         albumsLoading.value = true;
//         albumsError.value = null;
//         try {
//             const res = await fetch('https://api.spotify.com/v1/me/albums?limit=20', {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             if (!res.ok) throw new Error('Failed to fetch albums');
//             const data = await res.json();
//             albums.value = data.items.map((item: any) => item.album);
//         } catch (err) {
//             albumsError.value = err instanceof Error ? err.message : 'Failed to fetch albums';
//             console.error('Error fetching albums:', err);
//         } finally {
//             albumsLoading.value = false;
//         }
//     };

//     const getUserTracks = async (accessToken: string) => {
//         tracksLoading.value = true;
//         tracksError.value = null;
//         try {
//             const res = await fetch('https://api.spotify.com/v1/me/tracks?limit=20', {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             if (!res.ok) throw new Error('Failed to fetch tracks');
//             const data = await res.json();
//             tracks.value = data.items.map((item: any) => item.track);
//         } catch (err) {
//             tracksError.value = err instanceof Error ? err.message : 'Failed to fetch tracks';
//             console.error('Error fetching tracks:', err);
//         } finally {
//             tracksLoading.value = false;
//         }
//     };

//     return {
//         albums, tracks,
//         albumsLoading, tracksLoading,
//         albumsError, tracksError,
//         getUserAlbums, getUserTracks
//     };
// }; 

import { ref } from 'vue';

export const useSpotifyLibrary = () => {
    const albums = ref<any[]>([]);
    const tracks = ref<any[]>([]);
    const albumsLoading = ref(false);
    const tracksLoading = ref(false);
    const albumsError = ref<string | null>(null);
    const tracksError = ref<string | null>(null);

    const getUserAlbums = async (accessToken: string) => {
        albumsLoading.value = true;
        albumsError.value = null;
        try {
            const res = await fetch('https://api.spotify.com/v1/me/albums?limit=20', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (!res.ok) throw new Error('Failed to fetch albums');
            const data = await res.json();
            albums.value = data.items.map((item: any) => item.album);
        } catch (err) {
            albumsError.value = err instanceof Error ? err.message : 'Failed to fetch albums';
        } finally {
            albumsLoading.value = false;
        }
    };

    const getUserTracks = async (accessToken: string) => {
        tracksLoading.value = true;
        tracksError.value = null;
        try {
            const res = await fetch('https://api.spotify.com/v1/me/tracks?limit=20', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (!res.ok) throw new Error('Failed to fetch tracks');
            const data = await res.json();
            tracks.value = data.items.map((item: any) => item.track);
        } catch (err) {
            tracksError.value = err instanceof Error ? err.message : 'Failed to fetch tracks';
        } finally {
            tracksLoading.value = false;
        }
    };

    return {
        albums, tracks,
        albumsLoading, tracksLoading,
        albumsError, tracksError,
        getUserAlbums, getUserTracks
    };
}; 
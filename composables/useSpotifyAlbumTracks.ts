// composables/useSpotifyAlbumTracks.ts
export const useSpotifyAlbumTracks = () => {
  const getAlbumTracks = async (accessToken: string, albumId: string) => {
    const tracksEndpoint = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

    try {
      const response = await fetch(tracksEndpoint, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch album tracks');
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error getting album tracks:', error);
      throw new Error('Failed to get album tracks');
    }
  };

  return { getAlbumTracks };
};

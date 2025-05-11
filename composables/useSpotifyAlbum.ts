// composables/useSpotifyAlbum.ts
export const useSpotifyAlbum = () => {
  const getAlbumData = async (accessToken: string, albumId: string) => {
    const albumEndpoint = `https://api.spotify.com/v1/albums/${albumId}`;

    try {
      const response = await fetch(albumEndpoint, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch album data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting album data:', error);
      throw new Error('Failed to get album data');
    }
  };

  return { getAlbumData };
};

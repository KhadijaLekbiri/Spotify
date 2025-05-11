// composables/useSpotifyArtist.ts
export const useSpotifyArtist = () => {
  const getArtistData = async (accessToken: string, artistId: string) => {
    const artistEndpoint = `https://api.spotify.com/v1/artists/${artistId}`;

    try {
      const response = await fetch(artistEndpoint, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artist data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting artist data:', error);
      throw new Error('Failed to get artist data');
    }
  };

  return { getArtistData };
};

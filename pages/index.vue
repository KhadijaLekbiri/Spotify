<template>
  <div>
    <div v-if="!user">
      <button class="spotify-button" @click="loginWithSpotify">
        Login with Spotify
      </button>
    </div>
    <div v-else>
      <p>Welcome, {{ user.display_name }}</p>
      <p>Email: {{ user.email }}</p>
      <button class="spotify-button" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
const AuthUrl = 'https://accounts.spotify.com/authorize';
const ClientId = '53576fb1696b4060b49cedc2f8859d4a';
const RedirectUri = 'https://3b07-41-137-204-13.ngrok-free.app/callback';
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-top-read',
  'user-read-recently-played',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-follow-read'
].join(' ');

function loginWithSpotify() {
  window.location.href = `${AuthUrl}?client_id=${ClientId}&response_type=code&redirect_uri=${encodeURIComponent(RedirectUri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;
}

async function fetchPopularArtists() {
  try {
    const token = await getAccessToken();
    if (!token) return;

    // Using a different playlist ID that's more likely to be public
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=50', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch popular artists: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    // Process the data...
  } catch (error) {
    console.error('Error fetching popular artists:', error);
    // Handle the error appropriately
  }
}
</script>

<style>
body {
  background-color: #121212;
  color: #ffffff;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.spotify-button {
  background-color: #1db954;
  color: #000000;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 30px; /* Full pill shape */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.spotify-button:hover {
  background-color: #1ed760;
}
</style>

<template>
  <div>
    <p v-if="loading">Logging in...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

// Spotify Client Credentials
const CLIENT_ID = '53576fb1696b4060b49cedc2f8859d4a';
const CLIENT_SECRET = '635f498b437c448a84553f6f9dab0a1c';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const REDIRECT_URI = 'https://3b07-41-137-204-13.ngrok-free.app/callback';

// Optional: Custom localStorage keys for tokens
const TOKEN_KEY = 'spotify_token'
const REFRESH_TOKEN_KEY = 'spotify_refresh_token'
const EXPIRATION_KEY = 'spotify_token_expiration'

// Function to fetch the access token from Spotify
const getAccessToken = async (code) => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Calculate token expiration time and save tokens to localStorage
    const expirationTime = new Date().getTime() + response.data.expires_in * 1000;
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);
    localStorage.setItem(EXPIRATION_KEY, expirationTime);

    return response.data.access_token; // Return access token to use for redirect
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};

// Handle token exchange and redirect after successful login
onMounted(async () => {
  if (process.client) { // Ensure this runs only on the client side
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (!code) {
      console.error('No code in URL. Cannot proceed.');
      return;
    }

    try {
      // Await the access token before proceeding
      const accessToken = await getAccessToken(code);
      console.log("Token received:", accessToken);

      if (accessToken) {
        // Store token and redirect to the home
        localStorage.setItem('spotify_token', accessToken);
        // Use window.location.href for redirection
        window.location.href = '/Home';
      } else {
        console.error('No access token found in redirect.');
      }
    } catch (error) {
      console.error('Token exchange failed:', error);
    }
  }
});
</script>
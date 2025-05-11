<script setup lang="ts">
const config = useRuntimeConfig();

const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${config.spotify.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    config.spotify.redirectUri
  )}&scope=user-read-private user-read-email`;
  window.location.href = authUrl;
};
</script>

<template>
  <button @click="loginWithSpotify">Login with Spotify</button>
</template>

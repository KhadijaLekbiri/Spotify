<!-- <script setup lang="ts"></script> -->


    <!-- <header class="flex gap-4 items-center sticky -mx-4 px-4 -top-2 bg-zinc-800 py-2">
      <div class="flex gap-2">
        <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
          <Icon name="ri:arrow-left-s-line" size="24" />
        </button>
        <button class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center">
          <Icon name="ri:arrow-right-s-line" size="24" />
        </button>
      </div>
      <div class="flex-grow"></div>
      <button
        class="shrink-0 inline-flex gap-2 items-center px-4 py-1.5 tracking-wide font-semibold text-sm bg-zinc-200 border-zinc-200 text-zinc-900 rounded-full justify-center border"
      >
        Explore Premium
      </button>
      <button
        class="shrink-0 inline-flex gap-2 items-center px-4 py-1.5 tracking-wide font-semibold text-sm bg-zinc-950 border-zinc-950 text-zinc-200 rounded-full justify-center border"
      >
        <Icon name="ri:download-line" size="16" />
        Install App
      </button>
      <button>
        <img
          src="https://picsum.photos/50/50?random=1"
          alt="logo"
          class="w-8 h-8 rounded-full"
        />
      </button>
    </header>

    <NuxtPage /> -->
    
  <template>
  <div>
   <div>
    <div v-if="!user">
      <button @click="loginWithSpotify">Login with Spotify</button>
    </div>
    <div v-else>
      <p>Welcome, {{ user.display_name }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
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

// Local storage keys


function loginWithSpotify() {
  window.location.href = `${AuthUrl}?client_id=${ClientId}&response_type=code&redirect_uri=${encodeURIComponent(RedirectUri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;
}

</script>

<!-- 
<script setup>
import { ref, onMounted } from 'vue';

const user = ref(null);
const token = ref(localStorage.getItem('spotify_access_token') || null);

const fetchUserProfile = async () => {
  if (!token.value) return;

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (response.ok) {
    user.value = await response.json();
  } else {
    console.error('Failed to fetch user profile:', response.status);
  }
};

const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('spotify_access_token');
};

onMounted(() => {
  if (token.value) {
    fetchUserProfile();
  }
});
</script>

<template>
  <div>
    <div v-if="!user">
      <button @click="loginWithSpotify">Login with Spotify</button>
    </div>
    <div v-else>
      <p>Welcome, {{ user.display_name }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template> -->

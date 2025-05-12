<script setup lang="ts">
import { ref } from 'vue';
import { useSpotifyAuth } from '@/composables/useSpotifyAuth';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'created'): void;
}>();

const { accessToken } = useSpotifyAuth();
const playlistName = ref('');
const playlistDescription = ref('');
const isCreating = ref(false);
const error = ref('');
const defaultImageUrl = 'https://www.afrocharts.com/images/song_cover.png';

async function setPlaylistImage(playlistId: string, imageUrl: string) {
  // Fetch the image as a blob
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  // Convert blob to base64
  const reader = new FileReader();
  return new Promise<void>((resolve, reject) => {
    reader.onloadend = async () => {
      // Remove the data:image/png;base64, prefix
      const base64data = (reader.result as string).split(',')[1];
      // Upload to Spotify
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken.value}`,
          'Content-Type': 'image/jpeg' // Spotify only accepts JPEG, but PNG often works if you set this header
        },
        body: base64data
      });
      resolve();
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const createPlaylist = async () => {
  if (!playlistName.value.trim()) {
    error.value = 'Please enter a playlist name';
    return;
  }

  isCreating.value = true;
  error.value = '';

  try {
    // First get the user's ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });
    const userData = await userResponse.json();

    // Then create the playlist
    const response = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName.value,
        description: playlistDescription.value,
        public: false
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create playlist');
    }

    const newPlaylist = await response.json();
    // Set the default image
    await setPlaylistImage(newPlaylist.id, defaultImageUrl);

    emit('created');
    emit('close');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create playlist';
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-zinc-900 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Create New Playlist</h2>
        <button @click="emit('close')" class="text-zinc-400 hover:text-white">
          <Icon name="ri:close-line" size="24" />
        </button>
      </div>

      <form @submit.prevent="createPlaylist" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Playlist Name</label>
          <input
            id="name"
            v-model="playlistName"
            type="text"
            class="w-full px-3 py-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="My Playlist"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium mb-1">Description (optional)</label>
          <textarea
            id="description"
            v-model="playlistDescription"
            class="w-full px-3 py-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add an optional description"
            rows="3"
          ></textarea>
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isCreating"
            class="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isCreating ? 'Creating...' : 'Create Playlist' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 
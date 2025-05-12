<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSpotifyAuth } from '@/composables/useSpotifyAuth';
import { useSpotifyNowPlaying } from '@/composables/useSpotifyNowPlaying';

const { accessToken } = useSpotifyAuth();
const { currentTrack, progress, isPlaying, error, fetchNowPlaying, startPolling, stopPolling } = useSpotifyNowPlaying();

function formatTime(ms: number) {
  if (!ms) return '0:00';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

onMounted(async () => {
  if (accessToken.value) {
    await fetchNowPlaying(accessToken.value);
    startPolling(accessToken.value);
  }
});

onUnmounted(() => {
  stopPolling();
});
</script>

<template>
  <div v-if="currentTrack" class="bg-zinc-900 p-4 rounded-lg">
    <div class="flex flex-col gap-4">
      <!-- Album Art / Video Thumbnail -->
      <img
        :src="currentTrack.album?.images?.[0]?.url || currentTrack.images?.[0]?.url"
        :alt="currentTrack.album?.name || currentTrack.name"
        class="w-full aspect-square rounded-md object-cover"
      />
      
      <!-- Track/Video Info -->
      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg">{{ currentTrack.name }}</h3>
        <p class="text-sm text-gray-400">
          {{ currentTrack.type === 'track' 
            ? currentTrack.artists?.map(a => a.name).join(', ')
            : currentTrack.show?.name || currentTrack.publisher?.name
          }}
        </p>
        <p v-if="currentTrack.type === 'track'" class="text-sm text-gray-500">
          {{ currentTrack.album?.name }}
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="bg-zinc-800 h-1 rounded-full overflow-hidden">
          <div
            class="bg-green-500 h-full transition-all duration-1000"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-400">
          <span>{{ formatTime(currentTrack.progress_ms) }}</span>
          <span>{{ formatTime(currentTrack.duration_ms) }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between">
        <button class="text-gray-400 hover:text-white">
          <Icon name="ri:shuffle-line" size="24" />
        </button>
        <button class="text-gray-400 hover:text-white">
          <Icon name="ri:skip-back-fill" size="24" />
        </button>
        <button class="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform">
          <Icon :name="isPlaying ? 'ri:pause-fill' : 'ri:play-fill'" size="24" />
        </button>
        <button class="text-gray-400 hover:text-white">
          <Icon name="ri:skip-forward-fill" size="24" />
        </button>
        <button class="text-gray-400 hover:text-white">
          <Icon name="ri:repeat-line" size="24" />
        </button>
      </div>

      <!-- Volume Control -->
      <div class="flex items-center gap-2">
        <Icon name="ri:volume-down-line" size="20" class="text-gray-400" />
        <div class="flex-grow bg-zinc-800 h-1 rounded-full overflow-hidden">
          <div class="bg-gray-400 h-full w-1/2"></div>
        </div>
        <Icon name="ri:volume-up-line" size="20" class="text-gray-400" />
      </div>
    </div>
  </div>
</template>

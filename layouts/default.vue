<script setup lang="ts">
import { useNowPlaying } from '@/composables/layout';

const nowPlaying = useNowPlaying();
</script>

<template>
  <div class="flex h-[calc(100vh-76px)]">
    <div class="w-1/4">
      <Sidebar />
    </div>
    <main :class="nowPlaying ? 'w-50%' : 'w-100%'">
      <div
        class="rounded-md bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 px-4 py-2 h-full scroll"
      >
        <slot />
      </div>
    </main>
    <div v-if="nowPlaying" class="w-1/4">
      <NowPlaying />
    </div>
  </div>
</template>
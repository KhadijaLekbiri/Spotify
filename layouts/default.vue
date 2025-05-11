<script setup lang="ts">
// import { useNowPlaying } from '@/composables/layout';

const nowPlaying = useNowPlaying();
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-[calc(100vh-76px)]">
      <Sidebar />
      <main class="py-2 pr-2 flex-grow">
        <div
          class="rounded-md bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 px-4 py-2 h-full scroll"
        >
          <slot />
        </div>
      </main>
      <!-- <NowPlaying /> -->
    </div>
    <!-- <MusicPlayer /> -->
  </div>
</template>
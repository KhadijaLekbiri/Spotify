<script setup lang="ts">
//
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-[calc(100vh-76px)]">
      <Sidebar />
      <main class="w-6/12 py-2 pr-2">
        <div
          class="rounded-md bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 px-4 py-2 h-full overflow-clip hover:overflow-y-auto"
        >
          <slot />
        </div>
      </main>
      <aside class="w-3/12 p-2">
        <NowPlaying />
      </aside>
    </div>
    <MusicPlayer />
  </div>
</template>

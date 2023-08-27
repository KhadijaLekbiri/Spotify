<script setup lang="ts"></script>

<template>
  <div class="rounded-md bg-zinc-800 px-3 py-2">
    <div class="flex gap-3">
      <h3 class="font-bold flex-1">Next in queue</h3>
      <button class="font-semibold text-sm text-zinc-400 hover:text-zinc-200">
        Open queue
      </button>
    </div>

    <div class="flex gap-3 items-center mt-3">
      <Icon name="ri:music-line" size="20" />
      <img
        src="https://picsum.photos/40/40?id=now-playing-queue"
        alt="Album Cover"
        class="shrink-0"
      />
      <div class="flex-grow">
        <h4 class="text-sm font-bold">Sial</h4>
        <p class="text-xs text-zinc-400">Mahalini</p>
      </div>
    </div>
  </div>
</template>

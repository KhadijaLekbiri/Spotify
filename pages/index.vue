<script setup lang="ts"></script>

<template>
  <div>
    <header class="flex gap-4 items-center sticky -mx-4 px-4 -top-2 bg-zinc-800 py-2">
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

    <NuxtPage />
  </div>
</template>

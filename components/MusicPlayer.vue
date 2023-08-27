<script setup lang="ts">
const nowPlaying = useNowPlaying();
</script>

<template>
  <header
    class="w-full bg-zinc-950 text-zinc-200 py-3 px-4 flex items-center justify-between gap-4"
  >
    <div class="w-4/12">
      <div class="flex gap-4 items-center">
        <img src="https://picsum.photos/50/50" alt="album cover" class="rounded-md" />
        <div>
          <h3 class="font-semibold text-sm">Jiwa Yang Bersedih</h3>
          <p class="text-xs mt-0.5">Ghea Indrawari</p>
        </div>
        <div class="flex gap-4 items-center">
          <button>
            <Icon name="ri:heart-line" size="20" />
          </button>
          <button>
            <Icon name="ri:picture-in-picture-fill" size="20" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-4/12">
      <div class="flex items-center justify-center gap-4">
        <button class="w-6 h-6 flex justify-center items-center">
          <Icon name="ri:shuffle-fill" size="20" />
        </button>
        <button class="w-6 h-6 flex justify-center items-center">
          <Icon name="ri:skip-back-fill" size="20" />
        </button>
        <button
          class="bg-white w-8 h-8 rounded-full grid place-items-center text-zinc-800"
        >
          <Icon name="ri:play-fill" size="20" />
        </button>
        <button class="w-6 h-6 flex justify-center items-center">
          <Icon name="ri:skip-forward-fill" size="20" />
        </button>
        <button class="w-6 h-6 flex justify-center items-center">
          <Icon name="ri:repeat-fill" size="20" />
        </button>
      </div>
      <div class="flex gap-2 items-center mt-1">
        <span class="text-xs">2:13</span>
        <div class="flex-1">
          <div class="bg-gray-300 h-1 rounded-full">
            <div class="bg-green-500 h-1 w-7/12 rounded-full" />
          </div>
        </div>
        <span class="text-xs">4:13</span>
      </div>
    </div>

    <div class="w-4/12 flex gap-4 items-center justify-end">
      <button @click="nowPlaying = !nowPlaying" class="hover:text-primary-600">
        <Icon name="ri:play-circle-line" size="20" />
      </button>
      <button>
        <Icon name="ph:microphone-stage" size="20" />
      </button>
      <button>
        <Icon name="ph:queue" size="20" />
      </button>
      <button>
        <Icon name="ph:devices" size="20" />
      </button>
      <button>
        <Icon name="ri:volume-down-line" size="20" />
      </button>
      <!-- <input type="range" class="appearance-none rounded-full h-[4px]" /> -->
      <div class="w-20">
        <div class="bg-gray-300 h-1 rounded-full">
          <div class="bg-green-500 h-1 w-2/12 rounded-full" />
        </div>
      </div>
    </div>
  </header>
</template>

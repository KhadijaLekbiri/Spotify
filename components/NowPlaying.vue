<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    class="rounded-md bg-zinc-900 px-4 py-2 h-full overflow-hidden hover:overflow-y-auto flex flex-col gap-4"
  >
    <div class="flex gap-3">
      <h3 class="text-xl font-bold flex-1">50 Teratas - Indonesia</h3>
      <button @click="emit('close')">
        <Icon name="ri:close-line" size="20" />
      </button>
    </div>

    <img
      src="https://picsum.photos/200/300?id=now-playing-cover"
      alt="Album Cover"
      class="w-full h-64 object-cover rounded-md"
    />

    <div class="flex items-center">
      <div class="flex-grow">
        <h4 class="text-lg font-bold">Sial</h4>
        <p class="text-base text-zinc-400">Mahalini</p>
      </div>
      <div class="flex items-center gap-3">
        <button>
          <Icon name="ri:heart-line" size="20" />
        </button>
        <button>
          <Icon name="ri:more-line" size="20" />
        </button>
      </div>
    </div>

    <ArtistInfo />

    <NextQueue />
  </div>
</template>

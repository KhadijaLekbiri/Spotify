<script setup lang="ts">
defineProps<{
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    class="px-3 py-3 rounded-[12px] bg-zinc-950/50 hover:bg-zinc-950/90 transition duration-200"
  >
    <img :src="image" :alt="imageAlt || title" class="rounded-md w-full" />
    <h3 class="line-clamp-1 font-semibold text-sm mt-3">
      {{ title }}
    </h3>
    <p class="text-xs mt-1.5 line-clamp-2 text-zinc-400">
      {{ description }}
    </p>
  </div>
</template>

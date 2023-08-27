<script setup lang="ts">
useHead({
  title: "Nuxt Spotify Clone",
  bodyAttrs: {
    class: "bg-zinc-950 text-zinc-200",
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.scroll {
  overflow: auto;
}

.scroll:active::-webkit-scrollbar-thumb,
.scroll:focus::-webkit-scrollbar-thumb,
.scroll:hover::-webkit-scrollbar-thumb {
  visibility: visible;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: theme("colors.zinc.600");
  visibility: hidden;
  border-radius: 1rem;
}

.scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
</style>

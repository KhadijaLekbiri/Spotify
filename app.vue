<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-zinc-950 text-zinc-200',
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

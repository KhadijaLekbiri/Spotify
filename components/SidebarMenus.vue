<script setup lang="ts">
defineProps<{
  mini: boolean;
}>();

const items = ref([
  {
    text: "Home",
    icon: "ri:home-line",
  },
  {
    text: "Search",
    icon: "ri:search-line",
  },
]);
</script>

<template>
  <div class="rounded-md bg-zinc-900 px-3 py-2">
    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full text-zinc-300 hover:text-zinc-50"
      :class="[mini ? 'justify-center' : 'justify-start']"
      to="/"
      v-for="item in items"
      :key="item.text"
    >
      <Icon :name="item.icon" :size="mini ? '34' : '26'" />
      <span v-if="!mini">{{ item.text }}</span>
    </NuxtLink>
  </div>
</template>

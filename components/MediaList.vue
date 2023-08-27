<script setup lang="ts">
const items = ref([
  {
    image: "https://picsum.photos/50/50?random=1",
    title: "Liked Songs",
    type: "Playlist",
    description: "336 songs",
  },
  {
    image: "https://picsum.photos/50/50?random=2",
    title: "This is: Noah",
    type: "Playlist",
    description: "Spotify",
  },
  {
    image: "https://picsum.photos/50/50?random=3",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=44",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=55",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=66",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=77",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=88",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=99",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=91",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
  {
    image: "https://picsum.photos/50/50?random=92",
    title: "Idgitaf",
    type: "Artist",
    description: "",
  },
]);
</script>

<template>
  <div class="mt-3 space-y-3 flex-grow overflow-clip hover:overflow-y-auto">
    <MediaListItem v-for="(item, index) in items" :key="index" v-bind="item" />
  </div>
</template>

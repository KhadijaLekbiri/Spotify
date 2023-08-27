<script setup lang="ts">
const items = [
  {
    label: "Recently Played",
    items: [
      {
        image: "https://picsum.photos/300/300?random=1",
        title: "Top 50 - Indonesia",
        description:
          "Your daily update of the most played tracks in Indonesia right now.",
      },
      {
        image: "https://picsum.photos/300/300?random=2",
        title: "Top 50 - Global",
        description: "The most played tracks on Spotify this week, worldwide.",
      },
      {
        image: "https://picsum.photos/300/300?random=3",
        title: "Top 50 - Indonesia",
        description:
          "Your daily update of the most played tracks in Indonesia right now.",
      },
      {
        image: "https://picsum.photos/300/300?random=4",
        title: "Top 50 - Global",
        description: "The most played tracks on Spotify this week, worldwide.",
      },
      {
        image: "https://picsum.photos/300/300?random=5",
        title: "Top 50 - Indonesia",
        description:
          "Your daily update of the most played tracks in Indonesia right now.",
      },
    ],
  },
  {
    label: "Made For Warsono",
    items: [
      {
        image: "https://picsum.photos/300/300?random=21",
        title: "Daily Mix 1",
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=22",
        title: "Daily Mix 2",
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=23",
        title: "Daily Mix 3",
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=24",
        title: "Daily Mix 4",
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=25",
        title: "Daily Mix 5",
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
    ],
  },
  {
    label: "Your top mixes",
    items: [
      {
        image: "https://picsum.photos/300/300?random=31",
        title: "Mix 1",
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=32",
        title: "Mix 2",
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=33",
        title: "Mix 3",
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=34",
        title: "Mix 4",
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: "https://picsum.photos/300/300?random=35",
        title: "Mix 5",
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
    ],
  },
];
</script>

<template>
  <div>
    <section class="mt-7" v-for="section in items" :key="section.label">
      <h2 class="text-2xl font-semibold">
        {{ section.label }}
      </h2>
      <div class="grid grid-cols-3 xl:grid-cols-5 gap-4 mt-5">
        <MediaCard v-for="item in section.items" :key="item.title" v-bind="item" />
      </div>
    </section>
  </div>
</template>

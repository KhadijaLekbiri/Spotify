<script setup lang="ts">
const items = [
  {
    label: 'Recently Played',
    items: [
      {
        image: 'https://picsum.photos/300/300?random=1',
        title: 'Top 50 - Indonesia',
        description:
          'Your daily update of the most played tracks in Indonesia right now.',
      },
      {
        image: 'https://picsum.photos/300/300?random=2',
        title: 'Top 50 - Global',
        description: 'The most played tracks on Spotify this week, worldwide.',
      },
      {
        image: 'https://picsum.photos/300/300?random=3',
        title: 'Top 50 - Indonesia',
        description:
          'Your daily update of the most played tracks in Indonesia right now.',
      },
      {
        image: 'https://picsum.photos/300/300?random=4',
        title: 'Top 50 - Global',
        description: 'The most played tracks on Spotify this week, worldwide.',
      },
      {
        image: 'https://picsum.photos/300/300?random=5',
        title: 'Top 50 - Indonesia',
        description:
          'Your daily update of the most played tracks in Indonesia right now.',
      },
    ],
  },
  {
    label: 'Made For Warsono',
    items: [
      {
        image: 'https://picsum.photos/300/300?random=21',
        title: 'Daily Mix 1',
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=22',
        title: 'Daily Mix 2',
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=23',
        title: 'Daily Mix 3',
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=24',
        title: 'Daily Mix 4',
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=25',
        title: 'Daily Mix 5',
        description:
          "Your daily mix of fresh tracks and the songs you've played most over the past month.",
      },
    ],
  },
  {
    label: 'Your top mixes',
    items: [
      {
        image: 'https://picsum.photos/300/300?random=31',
        title: 'Mix 1',
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=32',
        title: 'Mix 2',
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=33',
        title: 'Mix 3',
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=34',
        title: 'Mix 4',
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
      {
        image: 'https://picsum.photos/300/300?random=35',
        title: 'Mix 5',
        description:
          "Your  mix of fresh tracks and the songs you've played most over the past month.",
      },
    ],
  },
];
</script>

<template>
  <div>
    <header
      class="flex gap-4 items-center sticky -mx-4 px-4 -top-2 bg-zinc-800 py-2"
    >
      <div class="flex gap-2">
        <button
          class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center"
        >
          <Icon name="ri:arrow-left-s-line" size="24" />
        </button>
        <button
          class="w-8 h-8 bg-zinc-950 rounded-full grid place-items-center"
        >
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
        <Icon name="ri:arrow-down-s-line" size="16" />
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

    <section class="mt-7" v-for="section in items" :key="section.label">
      <h2 class="text-2xl font-semibold">
        {{ section.label }}
      </h2>
      <div class="grid grid-cols-5 gap-4 mt-5">
        <div
          class="px-3 py-3 rounded-[12px] bg-zinc-950/50 hover:bg-zinc-950/90 transition duration-200"
          v-for="item in section.items"
          :key="item.title"
        >
          <img :src="item.image" alt="logo" class="rounded-md w-full" />
          <h3 class="line-clamp-1 font-semibold text-sm mt-3">
            {{ item.title }}
          </h3>
          <p class="text-xs mt-1.5 line-clamp-2 text-zinc-400">
            {{ item.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

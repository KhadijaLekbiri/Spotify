<script setup lang="ts">
import { ref } from 'vue';

// Removed mini, as we're keeping the sidebar expanded
const tabs = [
  { text: 'All', value: 'all' },
  { text: 'Playlists', value: 'playlist' },
  { text: 'Albums', value: 'album' },
  { text: 'Songs', value: 'track' },
  { text: 'Podcasts', value: 'podcast' },
  { text: 'Shows', value: 'show' }
];
const selectedTab = ref('all');
const searchQuery = ref('');
const mediaListRef = ref();

const handleSearch = (event: Event) => {
  const input = event.target as HTMLInputElement;
  searchQuery.value = input.value;
  if (mediaListRef.value) {
    mediaListRef.value.searchQuery = input.value;
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  if (mediaListRef.value) {
    mediaListRef.value.searchQuery = '';
  }
};
</script>

<template>
  <aside class="p-2 space-y-2 flex flex-col shrink-0 w-[300px]">
    <img src="C:\Users\lenovo\nuxt-spotify-clone_ - Copie\logo.svg" alt="Logo" />

    <SidebarMenus />

    <div
      class="rounded-md bg-zinc-900 px-3 py-4 flex-grow max-h-[calc(100vh-200px)] flex flex-col gap-3"
    >
      <div class="flex gap-2 items-center">
        <button>
          <Icon name="ri:play-list-line" size="28" />
        </button>
        <h3 class="flex-grow font-semibold">Your Library</h3>
        <div class="flex gap-2 items-center">
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 flex items-center justify-center"
          >
            <Icon name="ri:add-line" size="20" />
          </button>
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 flex items-center justify-center"
          >
            <Icon name="ri:arrow-right-line" size="20" />
          </button>
        </div>
      </div>

      <div class="mt-3">
        <div class="flex justify-between items-center gap-2">
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 shrink-0 shadow-md flex items-center justify-center"
            @click="clearSearch"
          >
            <Icon name="ri:search-line" size="20" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            class="bg-zinc-800 px-3 py-1.5 rounded-full text-sm focus:outline-none w-full"
            :value="searchQuery"
            @input="handleSearch"
          />
          <button 
            v-if="searchQuery"
            class="text-xs flex items-center gap-1 hover:text-white"
            @click="clearSearch"
          >
            Clear
          </button>
          <button 
            v-else
            class="text-xs flex items-center gap-1"
          >
            Recents
            <Icon name="ri:arrow-down-s-line" size="16" />
          </button>
        </div>
      </div>

      <!-- MediaList: Pass ref to access search functionality -->
      <MediaList ref="mediaListRef" />
    </div>
  </aside>
</template>

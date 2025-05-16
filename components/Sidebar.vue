<script setup lang="ts">
import { ref } from 'vue';
import CreatePlaylistModal from './CreatePlaylistModal.vue';
import CreateMenuDropdown from './CreateMenuDropdown.vue';

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
const isCreatePlaylistModalOpen = ref(false);
const showDropdown = ref(false);
const showCreatePlaylist = ref(false);

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

const handlePlaylistCreated = () => {
  // Refresh the playlists list
  if (mediaListRef.value) {
    mediaListRef.value.fetchAll();
  }
};

function handleDropdownSelect(type: string) {
  showDropdown.value = false;
  if (type === 'playlist') showCreatePlaylist.value = true;
  // TODO: Add logic for 'mix' and 'folder' if needed
}
</script>

<template>
  <aside class="p-2 space-y-2 flex flex-col shrink-0 w-[300px]">
    <img src="logo.svg" alt="Logo" />

    <SidebarMenus />

    <div
      class="rounded-md bg-zinc-900 px-3 py-4 flex-grow max-h-[calc(100vh-200px)] flex flex-col gap-3"
    >
      <div class="flex gap-2 items-center relative">
        <button>
          <Icon name="ri:play-list-line" size="28" />
        </button>
        <h3 class="flex-grow font-semibold">Your Library</h3>
        <div class="flex gap-2 items-center relative">
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 flex items-center justify-center"
            @click="showDropdown = !showDropdown"
          >
            <Icon name="ri:add-line" size="20" />
          </button>
          <CreateMenuDropdown :open="showDropdown" @select="handleDropdownSelect" @close="showDropdown = false" />
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 flex items-center justify-center"
          >
            <Icon name="ri:arrow-right-line" size="20" />
          </button>
        </div>
      </div>

      <CreatePlaylistModal
        :is-open="showCreatePlaylist"
        @close="showCreatePlaylist = false"
        @created="handlePlaylistCreated"
      />

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
        </div>
      </div>

      <!-- MediaList: Pass ref to access search functionality -->
      <MediaList ref="mediaListRef" />
    </div>
  </aside>
</template>

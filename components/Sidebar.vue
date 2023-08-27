<script setup lang="ts">
const mini = useMiniSidebar();

const tabs = ref([
  {
    text: "Playlists",
    icon: "ri:play-list-line",
  },
  {
    text: "Artists",
    icon: "ri:artist-line",
  },
  {
    text: "Albums",
    icon: "ri:album-line",
  },
  {
    text: "Podcasts and Shows",
    icon: "ri:mic-line",
  },
]);
</script>

<template>
  <aside
    class="p-2 space-y-2 flex flex-col"
    :class="{
      'w-3/12': !mini,
      'w-28': mini,
    }"
  >
    <SidebarMenus :mini="mini" />

    <div
      class="rounded-md bg-zinc-900 px-3 py-2 flex-grow max-h-[calc(100vh-200px)] flex flex-col"
    >
      <div
        class="flex gap-2 items-center"
        :class="{
          'justify-center': mini,
        }"
      >
        <button @click="mini = !mini">
          <Icon name="ri:play-list-line" size="26" />
        </button>
        <template v-if="!mini">
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
        </template>
      </div>

      <div class="relative" :class="{ hidden: mini }">
        <div
          class="absolute left-0 inset-y-0 top-3 hidden items-center bg-gradient-to-r from-transparent to-zinc-800 pr-2"
        >
          <button
            class="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 shrink-0 shadow-md flex items-center justify-center"
          >
            <Icon name="ri:arrow-left-s-line" size="20" />
          </button>
        </div>

        <div
          class="absolute right-0 inset-y-0 top-3 flex items-center bg-gradient-to-l from-zinc-900 to-transparent pl-2"
        >
          <button
            class="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 shrink-0 shadow-md flex items-center justify-center"
          >
            <Icon name="ri:arrow-right-s-line" size="20" />
          </button>
        </div>

        <div class="flex gap-2 mt-3 overflow-x-clip hover:overflow-x-auto">
          <button
            class="px-3 py-2 shrink-0 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-zinc-700"
            v-for="tab in tabs"
            :key="tab.text"
          >
            {{ tab.text }}
          </button>
        </div>
      </div>

      <div class="mt-3" :class="{ hidden: mini }">
        <div class="flex justify-between items-center gap-2">
          <button
            class="w-8 h-8 rounded-full hover:bg-zinc-700 shrink-0 shadow-md flex items-center justify-center"
          >
            <Icon name="ri:search-line" size="20" />
          </button>

          <input
            type="text"
            placeholder="Search..."
            class="bg-zinc-800 hidden px-3 py-1.5 rounded-full text-sm focus:outline-none"
          />

          <button class="text-xs flex items-center gap-1">
            Recents
            <Icon name="ri:arrow-down-s-line" size="16" />
          </button>
        </div>
      </div>

      <MediaList :mini="mini" />
    </div>
  </aside>
</template>

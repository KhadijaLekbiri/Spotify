<script setup lang="ts">
//
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-[calc(100vh-76px)]">
      <aside class="w-3/12 p-2 space-y-2 flex flex-col">
        <div class="rounded-md bg-zinc-900 px-3 py-2">
          <NuxtLink
            class="text-sm font-semibold py-2 flex items-center gap-3 w-full text-zinc-300 hover:text-zinc-50"
            to="/"
          >
            <Icon name="ri:home-line" size="26" />
            <span>Home</span>
          </NuxtLink>
          <NuxtLink
            class="text-sm font-semibold py-2 flex items-center gap-3 w-full text-zinc-300 hover:text-zinc-50"
            to="/"
          >
            <Icon name="ri:search-line" size="26" />
            <span>Search</span>
          </NuxtLink>
        </div>

        <div
          class="rounded-md bg-zinc-900 px-3 py-2 flex-grow max-h-[calc(100vh-200px)] flex flex-col"
        >
          <div class="flex gap-2 items-center">
            <Icon name="ri:play-list-line" size="26" />
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

          <div class="relative">
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
              >
                Playlists
              </button>
              <button
                class="px-3 py-2 shrink-0 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                Artists
              </button>
              <button
                class="px-3 py-2 shrink-0 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                Albums
              </button>
              <button
                class="px-3 py-2 shrink-0 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                Podcasts and Shows
              </button>
            </div>
          </div>

          <div class="mt-3">
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

          <div
            class="mt-3 space-y-3 flex-grow overflow-clip hover:overflow-y-auto"
          >
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=1"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Liked Songs</h4>
                <div class="flex gap-2 items-center mt-1">
                  <Icon name="ph:push-pin" size="16" />
                  <span class="text-xs">Playlist</span>
                  <Icon name="ph:circle-fill" size="4" />
                  <span class="text-xs">336 songs</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=2"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>This is: Noah</h4>
                <div class="flex gap-2 items-center mt-1">
                  <Icon name="ph:push-pin" size="16" />
                  <span class="text-xs">Playlist</span>
                  <Icon name="ph:circle-fill" size="4" />
                  <span class="text-xs">Spotify</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <img
                src="https://picsum.photos/50/50?random=3"
                class="w-10 h-10 rounded-md"
              />
              <div class="flex-grow">
                <h4>Idgitaf</h4>
                <div class="flex gap-2 items-center mt-1">
                  <span class="text-xs">Artist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main class="w-6/12 py-2">
        <div class="rounded-md bg-zinc-900 px-4 py-2 h-full">
          <slot />
        </div>
      </main>
      <aside class="w-3/12 p-2">
        <div class="rounded-md bg-zinc-900 px-4 py-2 h-full">Now Playing</div>
      </aside>
    </div>
    <MusicPlayer />
  </div>
</template>

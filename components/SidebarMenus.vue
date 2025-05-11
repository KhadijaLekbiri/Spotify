<!-- <script setup lang="ts">
// import { useRouter } from "vue-router";
// import { computed } from "vue";
import { defineProps } from "vue";

defineProps<{
  mini: boolean;
}>();

const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.path);
</script> -->

<!-- <template>
  <div class="rounded-md bg-black px-3 py-2">
    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50"
      :class="[mini ? 'justify-center' : 'justify-start', currentRoute === '/another' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/Home"
    >
      <svg
        :width="mini ? '26' : '22'"
        :height="mini ? '26' : '22'"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M256.274 60.84L84.324 166.237V443.063H193.27V293.73H320.228V443.063H428.222V165.476L256.274 60.84ZM256.274 35.95L448.452 149.145V464.395H300V315.062H213.499V464.395H64.095V150.161L256.274 35.95Z"
        />
      </svg>
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50"
      :class="[mini ? 'justify-center' : 'justify-start', currentRoute === '/search-icon' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/search-icon"
    >
      <svg
        :width="mini ? '26' : '22'"
        :height="mini ? '26' : '22'"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
        />
      </svg>
      <span>Search</span>
    </NuxtLink>

    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50"
      :class="[mini ? 'justify-center' : 'justify-start', currentRoute === '/library' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/library"
    >
      <svg
        :width="mini ? '26' : '22'"
        :height="mini ? '26' : '22'"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
        />
      </svg>
      <span>Library</span>
    </NuxtLink>
  </div>
</template> -->

<script setup lang="ts">
// Removed the mini prop as it's no longer needed
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.path);
</script>


<template>
  <div class="rounded-md bg-black px-3 py-2">
    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50 justify-start"
      :class="[currentRoute === '/another' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/Home"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M256.274 60.84L84.324 166.237V443.063H193.27V293.73H320.228V443.063H428.222V165.476L256.274 60.84ZM256.274 35.95L448.452 149.145V464.395H300V315.062H213.499V464.395H64.095V150.161L256.274 35.95Z"
        />
      </svg>
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50 justify-start"
      :class="[currentRoute === '/search' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/search"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
        />
      </svg>
      <span>Search</span>
    </NuxtLink>

    <NuxtLink
      class="text-sm font-semibold py-2 flex items-center gap-3 w-full hover:text-zinc-50 justify-start"
      :class="[currentRoute === '/library' ? 'bg-black text-zinc-50' : 'text-zinc-300']"
      to="/library"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <path
          d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
        />
      </svg>
      <span>Library</span>
    </NuxtLink>
  </div>
</template>

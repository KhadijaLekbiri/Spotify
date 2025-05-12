<template>
  <div
    v-if="open"
    ref="dropdown"
    tabindex="0"
    class="absolute z-50 mt-2 w-72 bg-zinc-900 rounded-lg shadow-lg border border-zinc-800"
    @keydown.esc="close"
  >
    <button @click="select('playlist')" class="flex gap-3 w-full px-4 py-3 hover:bg-zinc-800 text-left">
      <Icon name="ri:music-2-line" size="28" />
      <div>
        <div class="font-bold">Playlist</div>
        <div class="text-sm text-zinc-400">Créez une playlist de titres ou d'épisodes</div>
      </div>
    </button>
    <button @click="select('mix')" class="flex gap-3 w-full px-4 py-3 hover:bg-zinc-800 text-left">
      <Icon name="ri:user-shared-line" size="28" />
      <div>
        <div class="font-bold">Mix à plusieurs</div>
        <div class="text-sm text-zinc-400">Créez un mix avec vos contacts</div>
      </div>
    </button>
    <button @click="select('folder')" class="flex gap-3 w-full px-4 py-3 hover:bg-zinc-800 text-left">
      <Icon name="ri:folder-line" size="28" />
      <div>
        <div class="font-bold">Dossier</div>
        <div class="text-sm text-zinc-400">Organisez vos playlists</div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (event: 'select', type: string): void; (event: 'close'): void }>();
const dropdown = ref<HTMLElement | null>(null);

function select(type: string) {
  emit('select', type);
}
function close() {
  emit('close');
}
function handleClickOutside(event: MouseEvent) {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    close();
  }
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script> 
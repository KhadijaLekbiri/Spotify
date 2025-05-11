<!-- <script setup lang="ts">
defineProps<{
  image: string;
  imageAlt?: string;
  title: string;
  type: string;
  description?: string;
  mini?: boolean;
}>();
</script>

<template>
  <div
    class="flex gap-3 items-center"
    :class="{
      'justify-center': mini,
    }"
  >
    <img :src="image" :alt="imageAlt || title" class="w-10 h-10 rounded-md shrink-0" />
    <div v-if="!mini" class="flex-grow">
      <h4>{{ title }}</h4>
      <div class="flex gap-2 items-center mt-1">
        <Icon name="ph:push-pin" size="16" />
        <span class="text-xs">{{ type }}</span>
        <template v-if="description">
          <Icon name="ph:circle-fill" size="4" />
          <span class="text-xs">{{ description }}</span>
        </template>
      </div>
    </div>
  </div>
</template> -->
<!-- 
<script setup lang="ts">
defineProps<{
  image: string;
  imageAlt?: string;
  title: string;
  type: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex gap-2 items-center">
    <img 
      :src="image" 
      :alt="imageAlt || title" 
      class="w-8 h-8 rounded-md shrink-0" 
    />
    <div class="flex-grow">
      <h4 class="text-sm font-semibold truncate">{{ title }}</h4>
      <div class="flex gap-2 items-center mt-1">
        <Icon name="ph:push-pin" size="14" />
        <span class="text-xs text-zinc-400">{{ type }}</span>
        <template v-if="description">
          <Icon name="ph:circle-fill" size="3" />
          <span class="text-xs text-zinc-400">{{ description }}</span>
        </template>
      </div>
    </div>
  </div>
</template> -->


<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  image: string;
  imageAlt?: string;
  title: string;
  type: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex gap-2 items-center p-2 hover:bg-zinc-100 rounded-md transition">
    <!-- Image -->
    <img 
      :src="image" 
      :alt="imageAlt || title" 
      class="w-12 h-12 rounded-md object-cover shrink-0" 
    />

    <!-- Text Content -->
    <div class="flex-grow">
      <!-- Title -->
      <h4 class="text-sm font-semibold truncate">{{ title }}</h4>

      <!-- Metadata -->
      <div class="flex gap-2 items-center mt-1">
        <template v-if="type">
          <span class="text-xs text-zinc-500">{{ type }}</span>
        </template>
        <template v-if="type && description">
          <Icon name="ph:circle-fill" size="3" class="text-zinc-500" />
        </template>
        <template v-if="description">
          <span class="text-xs text-zinc-500 truncate">{{ description }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

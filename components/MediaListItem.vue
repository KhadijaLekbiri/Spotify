<script setup lang="ts">
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
</template>

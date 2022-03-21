<template>
  <div class="absolute inset-0">
    <scrollbar class="flex-auto flex h-full" wrap-class="flex-auto flex flex-col" view-class="flex-auto flex flex-col">
      <div class="fixed-md body-x pt-8">
        <editor class="relative" />
      </div>

      <mind-map class="flex-auto min-h-[60vh]" />
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
  // Fragments
  import Editor from './fragments/editor.vue';
  import MindMap from './fragments/mind-map.vue';
  // Components
  import { Scrollbar } from 'polacoms';
</script>

<style scoped>

</style>
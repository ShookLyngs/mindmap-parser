<template>
  <div class="absolute inset-0">
    <scrollbar class="flex-auto flex h-full" wrap-class="flex-auto flex flex-col" view-class="flex-auto flex flex-col">
      <div class="fixed-md body-x py-20 md:py-36">
        <input-card />

        <div class="mt-2 p-4 w-full min-h-[300px] outline-none text-stone-100 bg-stone-600">
          Output
        </div>
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
  import InputCard from './fragments/input-editor.vue';
  import { Scrollbar } from 'polacoms';
  import { ref, watchEffect } from 'vue';
</script>

<style scoped>

</style>
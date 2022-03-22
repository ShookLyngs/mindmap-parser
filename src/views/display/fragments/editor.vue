<template>
  <div class="border-2 border-slate-200 bg-white focus:border-blue-500">
    <div class="pl-4 py-2 text-lg font-semibold">Input</div>
    <editor placeholder="Input here" v-model="input" />

    <div class="px-4 py-2.5 sticky bottom-0 flex justify-end border-t border-slate-100 bg-white">
      <loader
        class="opacity-button mr-2 px-3 h-9 flex rounded-full justify-center items-center text-slate-600 bg-slate-200"
        v-if="input.length > 0"
        @click="clear"
      >
        <icon class="text-xl"><clear-round /></icon>
      </loader>

      <loader
        class="opacity-button px-6 h-9 flex rounded-full justify-center items-center text-slate-100 bg-blue-600"
        @click="parse"
      >
        Parse
      </loader>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Components
  import Editor from '@/components/editor.vue';
  import Loader from '@/components/loader.vue';
  import { Icon } from '@vicons/utils';
  import { ClearRound } from '@vicons/material';
  // Functions
  import { useDisplay } from '../shared/use-display';

  const { input, clear, parse } = useDisplay();
</script>

<style scoped>

</style>
<template>
  <div class="relative">
    <div class="absolute left-0 right-0 top-0 h-[50px] bg-gradient-to-b from-slate-100 to-transparent" />

    <resize-observer @resize="resize">
      <div ref="canvas" class="w-full h-full cursor-grab active:cursor-grabbing" />
    </resize-observer>

    <div class="absolute inset-0 flex justify-center items-center text-7xl bg-slate-100" v-if="!node">
      <div class="w-32 h-32 rounded-full flex justify-center items-center text-slate-500 bg-slate-200">
        <icon >
          <account-tree-round />
        </icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Components
  import { ResizeObserver } from 'polacoms';
  import { Icon } from '@vicons/utils';
  import { AccountTreeRound } from '@vicons/material';
  // Functions
  import { ref, shallowRef, watch, watchEffect } from 'vue';
  import { useDisplay } from '../shared/use-display';
  import { createMindmapParser, MindmapParser } from '@/packages/mindmap-parser';

  // Mindmap display
  const canvas = ref<HTMLDivElement>();
  const parser = shallowRef<MindmapParser<HTMLDivElement>>();
  function init() {
    parser.value = createMindmapParser({
      selector: canvas.value,
      root: node.value,
    });
  }
  function resize() {
    parser.value?.resize?.();
  }

  // When input changed, update the mindmap
  const { node } = useDisplay();
  watch(node, (newNode) => {
    if (newNode && parser.value) {
      parser.value.update(newNode);
    } else if (!newNode && parser.value) {
      parser.value.destroy();
      parser.value = void 0;
    }
  });

  // When node exists and mindmap is not, init the mindmap
  watchEffect(() => {
    if (canvas.value && !parser.value && node.value) {
      init();
    }
  });
</script>

<style scoped>

</style>
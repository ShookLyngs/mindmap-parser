<template>
  <div class="relative">
    <div class="absolute left-0 right-0 top-0 h-[50px] bg-gradient-to-b from-slate-100 to-transparent" />

    <resize-observer @resize="resize">
      <div ref="canvas" class="w-full h-full cursor-grab active:cursor-grabbing" />
    </resize-observer>
  </div>
</template>

<script setup lang="ts">
  // Components
  import { ResizeObserver } from 'polacoms';
  // Functions
  import { ref, watchEffect } from 'vue';
  import { createMindmapParser, MindmapParser } from '@/packages/mindmap-parser';
  import { testRawNode, testRawNodeAddedChild114, testRawNodeAddedChild134 } from '@/views/display/constant/node';

  const canvas = ref<HTMLDivElement>();
  const parser = ref<MindmapParser<HTMLDivElement>>();
  function resize() {
    parser.value?.resize?.();
  }

  watchEffect(() => {
    if (canvas.value) {
      parser.value = createMindmapParser({
        selector: canvas.value,
        root: testRawNode,
      });

      resize();

      setTimeout(() => {
        parser.value!.node.update(testRawNodeAddedChild114);
      }, 1000);

      setTimeout(() => {
        parser.value!.node.update(testRawNodeAddedChild134);
      }, 3000);
    }
  });
</script>

<style scoped>

</style>
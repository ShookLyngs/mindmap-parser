<template>
  <div class="absolute inset-0">
    <scrollbar class="flex-auto flex h-full" wrap-class="flex-auto flex flex-col" view-class="flex-auto flex flex-col">
      <div class="fixed-md body-x py-20 md:py-36">
        <input-card />

        <div ref="canvas" class="mt-2 w-full min-h-[300px] outline-none text-stone-100 bg-stone-600" />
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
  import InputCard from './fragments/input-editor.vue';
  import { Scrollbar } from 'polacoms';
  import { ref, watchEffect } from 'vue';
  import { createMindmapParser } from '@/packages/mindmap-parser';
  import { G } from '@svgdotjs/svg.js';

  const canvas = ref<HTMLDivElement>();
  watchEffect(() => {
    if (canvas.value) {
      const parser = createMindmapParser({
        selector: canvas.value,
        root: {
          content: 'Root',
          children: [
            {
              content: 'Child 1',
              children: [
                {
                  content: 'Child 1-1',
                },
                {
                  content: 'Child 1-2',
                },
              ],
            },
            {
              content: 'Child 2',
              children: [
                {
                  content: 'Child 2-1',
                },
                {
                  content: 'Child 2-2',
                },
              ],
            },
          ],
        },
      });

      console.log(parser);
      const root = parser.node.group;
      const { width, height } = root.bbox();
      const { clientWidth, clientHeight } = canvas.value;
      (parser.node.node.parent() as G).move(clientWidth / 2 - (width / 2), clientHeight / 2 - (height / 2));
    }
  });
</script>

<style scoped>

</style>
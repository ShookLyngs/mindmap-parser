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

  const canvas = ref<HTMLDivElement>();
  const parser = ref<MindmapParser<HTMLDivElement>>();
  function resize() {
    parser.value?.resize?.();
  }

  watchEffect(() => {
    if (canvas.value) {
      parser.value = createMindmapParser({
        selector: canvas.value,
        root: {
          content: 'Root',
          children: [
            {
              content: 'Child 1',
              children: [
                {
                  content: 'Child 1-1',
                  children: [
                    {
                      content: 'Child 1-1-1',
                    },
                    {
                      content: 'Child 1-1-2',
                    },
                    {
                      content: 'Child 1-1-3',
                      children: [
                        {
                          content: 'Child 1-1-3-1',
                        },
                        {
                          content: 'Child 1-1-3-2',
                        },
                        {
                          content: 'Child 1-1-3-3',
                        },
                        {
                          content: 'Child 1-1-3-4',
                        },
                      ],
                    },
                  ],
                },
                {
                  content: 'Child 1-2 Super Long Text to cover up',
                },
                {
                  content: 'Child 1-3',
                  children: [
                    {
                      content: 'Child 1-3-1',
                    },
                    {
                      content: 'Child 1-3-2',
                    },
                    {
                      content: 'Child 1-3-3',
                    },
                  ],
                },
                {
                  content: 'Child 1-4',
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

      resize();
    }
  });
</script>

<style scoped>

</style>
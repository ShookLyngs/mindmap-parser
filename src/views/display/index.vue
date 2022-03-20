<template>
  <div class="absolute inset-0">
    <scrollbar class="flex-auto flex h-full" wrap-class="flex-auto flex flex-col" view-class="flex-auto flex flex-col">
      <div class="fixed-md body-x py-8">
        <input-card class="relative" />
      </div>
      <div class="flex-auto min-h-[60vh]">
        <resize-observer @resize="resize">
          <div ref="canvas" class="w-full h-full" />
        </resize-observer>
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
  import InputCard from './fragments/input-editor.vue';
  import { Scrollbar, ResizeObserver } from 'polacoms';
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
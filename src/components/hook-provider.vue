<template>
  <slot />
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  const props = defineProps({
    hook: {
      type: Function,
      required: true,
    },
  });

  props.hook();
</script>
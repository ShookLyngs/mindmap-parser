<template>
  <div class="relative" :class="{ 'is-loading': loading, 'is-disabled': disabled }" @click="onClick">
    <div class="transition flex justify-center w-full" :class="loading ? 'opacity-0' : ''">
      <slot />
    </div>
    <transition name="fade">
      <div class="absolute left-0 top-0 w-full h-full flex justify-center items-center" v-if="loading">
        <loading-indicator />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { LoadingIndicator } from 'polacoms';
  import { defineProps } from 'vue';

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: void 0,
    },
  });

  const emit = defineEmits([ 'click' ]);
  function onClick() {
    if (!props.loading && !props.disabled) {
      emit('click');
    }
  }
</script>

<style scoped>

</style>
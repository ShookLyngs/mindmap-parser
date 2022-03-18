<template>
  <div class="px-4 pb-4 w-full input" :data-value="input">
    <textarea
      rows="1"
      class="outline-none overflow-auto resize-none"
      :placeholder="placeholder"
      v-model="input"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, toRef, watch } from 'vue';

  const emit = defineEmits(['update:model-value', 'focus', 'blur']);
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  });

  const value = toRef(props, 'modelValue');
  const input = ref(value.value);

  watch(value, (value: string) => input.value = value);
  watch(input, (value: string) => emit('update:model-value', value));
</script>

<style scoped>
  .input {
    display: inline-grid;
    vertical-align: top;
    align-items: stretch;

    &::after {
      content: attr(data-value) ' ';
      white-space: pre-wrap;
      visibility: hidden;
    }

    &::after,
    textarea {
      grid-area: 2 / 1;
    }
  }
</style>
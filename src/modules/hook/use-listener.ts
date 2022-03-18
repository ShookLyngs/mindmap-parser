// Functions
import { onUnmounted, ref } from 'vue';
// Types
import { Ref } from 'vue';
import { Noop } from '@/modules/define/function';

/**
 * Simple hook to create a custom event listener.
 */
export function useListener<T extends ((...args: any[]) => any) = Noop>({ clearOnUnmount = false } = {}) {
  const listeners: Ref<T[]> = ref([]);

  function on(callback: T) {
    if (!listeners.value.includes(callback)) {
      listeners.value.push(callback);
      return () => off(callback);
    }
  }
  function off(listener: T) {
    listeners.value = listeners.value.filter(cb => cb !== listener);
  }
  function emit(...args: Parameters<T>) {
    listeners.value.forEach(callback => callback(...args));
  }

  // If the component is unmounted, clear the listeners
  if (clearOnUnmount) {
    onUnmounted(() => {
      listeners.value.forEach(off);
    });
  }

  return {
    on,
    off,
    emit,
  };
}
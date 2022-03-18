import { provide, inject } from 'vue';

export function useProvide<T extends Object>(name: string, getter: () => T): T {
  const inherited = inject<T>(name, void 0);
  if (inherited) return inherited;

  const state = getter();
  provide<T>(name, state);
  return state;
}
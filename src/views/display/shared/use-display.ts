import { ref } from 'vue';
import { useProvide } from '@/modules/hook/use-provide';
import { RawNode, stringToRawNode } from '@/packages/mindmap-parser';

export function useDisplay() {
  return useProvide('display', () => {
    const input = ref('');
    function clear() {
      input.value = '';
    }

    const node = ref<RawNode>();
    function parse() {
      if (input.value.trim()) {
        node.value = stringToRawNode(input.value, {
          space: 2,
        });
      } else {
        node.value = void 0;
      }
    }

    return {
      input,
      clear,

      node,
      parse,
    };
  });
}

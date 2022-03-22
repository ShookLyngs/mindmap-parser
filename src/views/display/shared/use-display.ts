import { ref } from 'vue';
import { RawNode, stringToRawNode } from '@/packages/mindmap-parser';
import { useProvide } from '@/modules/hook/use-provide';

export function useDisplay() {
  return useProvide('display', () => {
    const input = ref('');
    function clear() {
      input.value = '';
    }

    const node = ref<RawNode>();
    function parse() {
      node.value = stringToRawNode(input.value, {
        space: 2,
      });
    }

    return {
      input,
      clear,

      node,
      parse,
    };
  });
}

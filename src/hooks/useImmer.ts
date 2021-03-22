import { defineComponent, ref } from 'vue';
import { produce } from 'immer';

const useImmer = defineComponent({
  setup() {
    const updateVal = ref(null);
    return {
      updateVal,
    };
  },
});

export default useImmer;

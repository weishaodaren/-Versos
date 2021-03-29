<template>
  <div class="tea-container">
    This is Tea
    <h5 @click="increment">{{ title }}</h5>
    <h4 @click="onAdd">CLICK ME {{ num }}</h4>
    <i>{{ count }}</i>
    <br />
    <input v-model="computedNum" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  toRef,
  watch,
  onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '@/stores';

export default defineComponent({
  name: 'Tea',
  setup() {
    const store = useStore(key);
    const title = ref<string | null>(null);
    const state = reactive({
      count: 9,
      age: 1,
    });

    const num = computed(() => store.getters.count);

    const computedNum = computed({
      get: () => {
        return state.count++;
      },
      set: (value) => {
        console.log(value, 'this is computed set');
        return state.count + value;
      },
    });

    const stop = watch(
      [() => state.count, () => state.age],
      ([newCount, newAge], [oldCount, oldAge]) => {
        console.log([newCount, newAge], [oldCount, oldAge]);
      }
    );

    onMounted(() => {
      const {
        query: { msg },
      } = useRoute();

      title.value = msg as string;
    });

    onUnmounted(() => {
      stop();
    });
    return {
      title,
      increment: () => store.dispatch('increments', 20),
      onAdd: () => store.commit({ type: 'increment', amount: 1 }),
      num,
      count: toRef(state, 'count'),
      computedNum,
    };
  },
});
</script>

<style lang="less" scoped>
@font-size: 10px;
.tea-container {
  background: teal;
  font-size: @font-size;

  i:hover {
    cursor: pointer;
    color: tomato;
    font-size: @font-size + 100px;
  }
}
</style>

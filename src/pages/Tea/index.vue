<template>
  <div class="tea-container">
    This is Tea
    <h5 @click="increment">{{ title }}</h5>
    <h4 @click="onAdd">CLICK ME {{ num }}</h4>
    <i>{{ count }}</i>
    <br />
    <input v-model="computedNum" />
    <div class="pyramid">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
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

  .pyramid {
    padding: 0;
    margin: 0px;
    ul,
    li {
      list-style: none;
    }
    ul {
      width: 100px;
      height: 100px;
      position: relative;
      left: 100px;
      top: 200px;
      transform: rotateX(70deg) rotateZ(45deg);
      transform-style: preserve-3d;
      animation: rate 10s linear infinite;
      li {
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: linear-gradient(#d9b200 1%, #ffdd40);
        &:nth-child(1) {
          transform: translateZ(-50px) translateY(-100px) rotateX(-75deg);
          height: 200px;
          transform-origin: 0 100%;
          clip-path: polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%);
        }
        &:nth-child(2) {
          transform: rotateX(-180deg) translateZ(50px);
        }
        &:nth-child(3) {
          height: 200px;
          transform-origin: 0 100%;
          transform: translateZ(-50px) translateY(-200px) rotateX(-105deg);
          clip-path: polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%);
        }
        &:nth-child(4) {
          width: 200px;
          transform-origin: 100% 100%;
          transform: translateZ(-50px) translateX(-200px) rotateY(105deg);
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%, 0% 50%);
        }
        &:nth-child(5) {
          width: 200px;
          transform-origin: 100% 100%;
          transform: translateZ(-50px) translateX(-100px) rotateY(75deg);
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%, 0% 50%);
        }
      }
    }
    @keyframes rate {
      0% {
        transform: rotateX(45deg) rotateZ(360deg);
      }
      100% {
        transform: rotateX(45deg) rotateZ(0deg);
      }
    }
  }
}
</style>

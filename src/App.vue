<template>
  <div ref="refApp">
    <h5 @click="onTea">Go to Tea</h5>
    <h5 @click="onCoffee">Go to Coffee</h5>
    <h5 @click="onBeer">Go to Beer</h5>
    <h2 @click="onChange">count is : {{ countNum.count }}</h2>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import * as Util from './utils';

export default defineComponent({
  name: 'App',
  setup() {
    const refApp = ref<HTMLDivElement | Node>();
    const countNum = reactive({ count: 0 });

    Util.messageChannelFn().port1.postMessage('呼叫 port2');
    Util.messageChannelFn().port2.postMessage('回复 port1');
    const router = useRouter();
    const route = useRoute();

    const onTea = () =>
      router.push({
        path: '/tea',
        query: {
          ...route.query,
          msg: `weishaodaren loves green tea`,
        },
      });

    const onCoffee = () =>
      router.push({
        name: 'Coffee',
        params: {
          ...route.params,
          msg: `weishaodaren loves cold brew`,
        },
      });

    const onChange = () => countNum.count++;
    watch(
      () => countNum.count,
      (newVal, oldVal) => {
        console.log(oldVal, newVal);
      }
    );

    return {
      refApp,
      onTea,
      onCoffee,
      onChange,
      onBeer: () => router.replace('/beer'),
      countNum,
    };
  },
});
</script>

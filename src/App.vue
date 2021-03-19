<template>
  <!-- <Three msg="weishaodaren" /> -->
  <!-- <Line /> -->
  <div ref="refApp"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Three, Line } from './components';
import * as Util from './util';

export default defineComponent({
  name: 'App',
  components: {
    Three,
    Line,
  },
  setup() {
    const refApp = ref<HTMLDivElement | Node>();
    Util.messageChannelFn().port1.postMessage('呼叫 port2');
    Util.messageChannelFn().port2.postMessage('回复 port1');

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList?: [], observe?: unknown) => {
      if (!mutationList) return;
      for (let mutation of mutationList) {
        console.log(mutation, 'mutation');
      }
    };
    const observer = new MutationObserver(callback);

    onMounted(() => {
      console.log(refApp.value);
      observer.observe(<Node>refApp.value, config);
      refApp.value?.appendChild(document.createElement('div'));
      refApp.value?.appendChild(document.createTextNode('新增Text节点')); //不会观察到
      refApp.value?.childNodes[0].remove();
    });

    return {
      refApp,
    };
  },
});
</script>

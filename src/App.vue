<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import * as Util from './utils';

export default defineComponent({
  name: 'App',
  setup() {
    const refApp = ref<HTMLDivElement | Node>();
    const countNum = reactive({ count: 0 });
    const isHidden = ref<boolean>(true);
    const params = useRoute();

    Util.messageChannelFn().port1.postMessage('呼叫 port2');
    Util.messageChannelFn().port2.postMessage('回复 port1');

    return {
      refApp,
      countNum,
      isHidden,
      params,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin font-size {
  color: pink;
  font-size: 30px;
}

.count-style {
  @include font-size();
}
</style>

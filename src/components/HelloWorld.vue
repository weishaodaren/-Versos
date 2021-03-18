<template>
  <h1>{{ A }}</h1>
  <ul>
    <li v-for="(item, index) of R" :key="index">{{ item + index }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: (props) => {
    const A = props.msg + `is cool`;
    const R = reactive({
      a: 'A',
      b: 'B',
      c: 'ss',
      d: 'D',
    });
    const F = ref(0);
    console.log(F.value);
    const { a } = R;
    console.log(a);

    return {
      A,
      R,
    };
  },
});
</script>

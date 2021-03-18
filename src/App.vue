<template>
  <!-- <Three msg="weishaodaren" /> -->
  <Line />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Three, Line } from './components';

export default defineComponent({
  name: 'App',
  components: {
    Three,
    Line,
  },
});
</script>

<template>
  <div>
    This is Tea
    <h5>{{ title }}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Tea',
  setup() {
    const title = ref<string | null>(null);

    onMounted(() => {
      const {
        query: { msg },
      } = useRoute();

      title.value = msg as string;
    });
    return {
      title,
    };
  },
});
</script>

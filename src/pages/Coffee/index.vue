<template>
  <div>
    This is Coffee
    <h5>{{ title }}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Coffee',
  setup() {
    const title = ref<string | null>(null);

    onMounted(() => {
      const {
        params: { msg },
      } = useRoute();
      title.value = msg as string;
    });

    return {
      title,
    };
  },
});
</script>

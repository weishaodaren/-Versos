<template>
  <div>
    This is Tea
    <h5 @click="increment">{{ title }}</h5>
    <h4 @click="onAdd">CLICK ME {{num}}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore} from 'vuex'
import { key, IState } from '@/stores'

export default defineComponent({
  name: 'Tea',
  setup() {
    const store = useStore(key)
    const title = ref<string | null>(null);

    const num = computed(() => store.getters.count)
    
    onMounted(() => {
      const {
        query: { msg },
      } = useRoute();

      title.value = msg as string;
    });
    return {
      title,
      increment:() => store.dispatch('increments', 20),
      onAdd:() => store.commit({type: 'increment', amount: 1}),
      num
    };
  },
});
</script>

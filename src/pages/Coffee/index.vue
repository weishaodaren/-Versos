<template>
  <div class="coffee-container">
    This is Coffee
    <h5>{{ title }}</h5>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore, mapState } from 'vuex';
import { key, IState } from '@/stores';

export default defineComponent({
  name: 'Coffee',
  setup() {
    const store = useStore(key);
    console.log(store.state.count);

    onBeforeRouteLeave((to, from, next) => {
      console.log(`i am leaving`);
      next();
    });
    onBeforeRouteUpdate((to, from, next) => {
      console.log(`i am updating`);
      next();
    });
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

<style lang="stylus" scoped>
$font-size = 100px

.coffee-container
  background: #126
  color: white
  font-size:$font-size
  &:hover
    cursor: pointer
    color: red
    font-size: @font-size - 50px
</style>

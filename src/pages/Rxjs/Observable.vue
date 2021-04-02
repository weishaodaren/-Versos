<template>
  <div>
    Hi there
    <button ref="btnRef">Click me</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

export default defineComponent({
  name: 'observable',
  setup() {
    const btnRef = ref<HTMLButtonElement | null>(null);

    onMounted(() => {
      fromEvent(btnRef.value as HTMLButtonElement, 'click')
        .pipe(
          throttleTime(1000),
          scan((count) => count + 1, 0)
        )
        .subscribe((count) => console.log(`Clicked ! ${count}times`));
    });

    return {
      btnRef,
    };
  },
});
</script>

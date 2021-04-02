<template>
  <div>
    Hi there
    <button ref="btnRef">Click me</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fromEvent } from 'rxjs';
import { throttleTime, scan, map } from 'rxjs/operators';

export default defineComponent({
  name: 'fromEvent',
  setup() {
    const btnRef = ref<HTMLButtonElement | null>(null);

    onMounted(() => {
      fromEvent(btnRef.value as HTMLButtonElement, 'click')
        .pipe(
          throttleTime(1000) as any,
          map((event: MouseEvent) => event.clientX),
          scan((count, clientX) => count + clientX, 0)
        )
        .subscribe((count) => console.log(`Clicked ! ${count}`));
    });

    return {
      btnRef,
    };
  },
});
</script>

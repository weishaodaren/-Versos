import { Ref, reactive } from 'vue';

const useDebounce: (fn: Ref<void>, wait: number) => void = (fn, wait) => {
  const current = <
    {
      fn: unknown;
      timer: unknown;
    }
  >reactive({
    fn: fn,
    timer: null,
  });

  const run: () => void = () => {
    if (current.timer) clearTimeout(current.timer as number);
    current.timer = setTimeout(() => {
      (current.fn as Function)();
    }, wait);
  };

  const cancel = () => {
    if (current.timer) clearTimeout(current.timer as number);
  };

  return [run, cancel];
};

export default useDebounce;

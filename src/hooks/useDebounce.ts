import { reactive } from 'vue';

const useDebounce: (fn: Function, wait: number) => Function[] = (fn, wait) => {
  const current = <
    {
      fn: Function;
      timer: unknown | TimerHandler;
    }
  >reactive({
    fn,
    timer: null,
  });

  const run: (args: unknown) => void = (args) => {
    if (current.timer) clearTimeout(current.timer as number);
    current.timer = setTimeout(() => {
      (current.fn as Function)(args);
    }, wait);
  };

  const cancel = () => {
    if (current.timer) clearTimeout(current.timer as number);
  };

  return [run, cancel];
};

export default useDebounce;

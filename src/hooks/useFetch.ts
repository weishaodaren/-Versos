import {
  FunctionalComponent,
  reactive,
  toRefs,
  unref,
  onBeforeMount,
  Ref,
} from 'vue';

interface FetchOptions {
  url: Ref<string> | string;
  immediate: boolean;
  params: {
    [x: string]: any;
  };
}

const useFetch: FunctionalComponent<FetchOptions> = (options) => {
  const { url, immediate, params = {} } = options;

  const state = reactive({
    data: {},
    error: null,
    loading: false,
  });

  const run = async () => {
    let query = ``;
    Object.keys(params).forEach((param) => {
      const value = params[param];
      query += `${param}=${unref(value)}&`;
    });
    console.log(query);

    state.loading = true;

    try {
      const result = await fetch(`${unref(url)}?${query}`).then((res) =>
        res.json()
      );

      state.data = result;
    } catch (err) {
      state.error = err;
    }

    state.loading = false;
  };

  onBeforeMount(() => {
    immediate && run();
  });

  return {
    run,
    ...toRefs(state),
  };
};

export default useFetch;

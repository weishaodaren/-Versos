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
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  params: {
    [x: string]: any;
  };
}

/**
 * 请求路径
 */
const path: (P: string) => string = (path) => `https://api.github.com/${path}`;

/**
 * 拼接参数
 */
const stringify: (P: { [x: string]: string | number | boolean }) => string = (
  params
) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

const useFetch: FunctionalComponent<FetchOptions> = (options) => {
  let { url, immediate, params, method } = options;
  url = path(unref(url));

  let body: BodyInit | null = null;
  if (params) {
    if (method === `GET`) {
      url += `?${stringify(params)}`;
    } else {
      body = JSON.stringify(params);
    }
  }
  const headers = {
    'Content-Type': 'application/json',
  };

  const state = reactive({
    data: {},
    loading: false,
  });

  const run = async () => {
    state.loading = true;

    const result = await fetch(<string>url, {
      method,
      body,
      headers,
    });

    if (method === 'GET') {
      const resp = await result.json();
      state.data = resp;
    } else {
      state.data = result;
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

import { Ref, ref, unref, watch, computed, ComputedRef, shallowRef } from 'vue';

interface UseFetchReturnBase<T> {
  isFinished: Ref<boolean>;
  statusCode: Ref<number | null>;
  response: Ref<Response | null>;
  error: Ref<any>;
  data: Ref<T | null>;
  isFetching: Ref<boolean>;
  canAbort: ComputedRef<boolean>;
  aborted: Ref<boolean>;
  abort: Function;
  execute: () => Promise<any>;
}

type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData';
type PayloadType = 'text' | 'json' | 'formData';
type MaybeRef<T> = Ref<T> | T;

interface UseFetchReturnMethodConfigured<T> extends UseFetchReturnBase<T> {
  json<JSON = any>(): UseFetchReturnBase<JSON>;
  text(): UseFetchReturnBase<string>;
  blob(): UseFetchReturnBase<Blob>;
  arrayBuffer(): UseFetchReturnBase<ArrayBuffer>;
  formData(): UseFetchReturnBase<FormData>;
}

export interface UseFetchReturn<T> extends UseFetchReturnMethodConfigured<T> {
  get(): UseFetchReturnMethodConfigured<T>;
  post(
    payload?: unknown,
    type?: PayloadType
  ): UseFetchReturnMethodConfigured<T>;
  put(payload?: unknown, type?: PayloadType): UseFetchReturnMethodConfigured<T>;
  delete(
    payload?: unknown,
    type?: PayloadType
  ): UseFetchReturnMethodConfigured<T>;
}

export interface BeforeFetchContext {
  url: string;
  options: ResponseInit;
  cancel: Function;
}

export interface UseFetchOptions {
  fetch?: typeof window.fetch;
  immediate?: boolean;
  refetch?: Ref<boolean> | boolean;
  beforeFetch?: (
    ctx: BeforeFetchContext
  ) =>
    | Promise<Partial<BeforeFetchContext> | void>
    | Partial<BeforeFetchContext>
    | void;
}

export interface CreateFetchOptions {
  baseUrl?: Ref<string> | string;
  options?: UseFetchOptions;
  fetchOptions?: RequestInit;
}

export function createFetch(config: CreateFetchOptions = {}) {
  let options = config.options || {};
  let fetchOptions = config.fetchOptions || {};

  function useFactoryFetch(url: MaybeRef<string>, ...args: any[]) {
    const computedUrl = computed(() =>
      config.baseUrl ? joinPaths(unref(config.baseUrl), unref(url)) : unref(url)
    );

    if (args.length > 0) {
      if (args[0]) {
        options = { ...options, ...args[0] };
      } else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...(fetchOptions.headers || {}),
            ...(args[0].headers || {}),
          },
        };
      }
    }

    if (args.length > 1 && args[1]) options = { ...options, ...args[1] };

    return useFetch(computedUrl, fetchOptions, options);
  }

  return useFactoryFetch as typeof useFetch;
}

export function useFetch<T>(url: MaybeRef<string>): UseFetchReturn<T>;
export function useFetch<T>(
  url: MaybeRef<string>,
  useFetchOptions: UseFetchOptions
): UseFetchReturn<T>;
export function useFetch<T>(
  url: MaybeRef<string>,
  options: RequestInit,
  useFetchOptions?: UseFetchOptions
): UseFetchReturn<T>;

export function useFetch<T>(
  url: MaybeRef<string>,
  ...args: any[]
): UseFetchReturn<T> {
  const supportsAbort = typeof AbortController === 'function';

  let fetchOptions: RequestInit = {};
  let options: UseFetchOptions = { immediate: true, refetch: false };
  const config = {
    method: 'get',
    type: 'text' as DataType,
    payload: undefined as unknown,
    payloadType: 'json' as PayloadType,
  };
  let initialized = false;

  if (args.length > 0) {
    if (args[0]) options = { ...options, ...args[0] };
    else fetchOptions = args[0];
  }

  if (args.length > 1) {
    if (args[1]) options = { ...options, ...args[1] };
  }

  const { fetch } = options;

  const isFinished = ref(false);
  const isFetching = ref(false);
  const aborted = ref(false);
  const statusCode = ref<number | null>(null);
  const response = shallowRef<Response | null>(null);
  const error = ref<any>(null);
  const data = shallowRef<T | null>(null);

  const canAbort = computed(() => supportsAbort && isFetching.value);

  let controller: AbortController | undefined;

  const abort = () => {
    if (supportsAbort && controller) controller.abort();
  };

  const execute = async () => {
    initialized = true;
    isFetching.value = true;
    isFinished.value = false;
    error.value = null;
    statusCode.value = null;
    aborted.value = false;
    controller = undefined;

    if (supportsAbort) {
      controller = new AbortController();
      controller.signal.onabort = () => (aborted.value = true);
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal,
      };
    }

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    };

    if (config.payload) {
      const headers = defaultFetchOptions.headers as Record<string, string>;
      if (config.payloadType === 'json') {
        defaultFetchOptions.body = JSON.stringify(config.payload);
        headers['Content-Type'] = 'application/json';
      } else {
        defaultFetchOptions.body = config.payload as any;
        headers['Content-Type'] =
          config.payloadType === 'formData'
            ? 'multipart/form-data'
            : 'text/plain';
      }
    }

    let isCanceled = false;
    const context: BeforeFetchContext = {
      url: unref(url),
      options: fetchOptions,
      cancel: () => {
        isCanceled = true;
      },
    };

    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context));

    if (isCanceled || !fetch) return Promise.resolve();

    return new Promise((resolve) => {
      fetch(context.url, {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...defaultFetchOptions.headers,
          ...context.options?.headers,
        },
      })
        .then(async (fetchResponse) => {
          response.value = fetchResponse;
          statusCode.value = fetchResponse.status;

          await fetchResponse[config.type]().then(
            (text) => (data.value = text as any)
          );

          if (!fetchResponse.ok) throw new Error(fetchResponse.statusText);

          resolve(fetchResponse);
        })
        .catch((fetchError) => {
          error.value = fetchError.message || fetchError.name;
        })
        .finally(() => {
          isFinished.value = true;
          isFetching.value = false;
        });
    });
  };

  watch(
    () => [unref(url), unref(options.refetch)],
    () => unref(options.refetch) && execute(),
    { deep: true }
  );

  const base: UseFetchReturnBase<T> = {
    isFinished,
    statusCode,
    response,
    error,
    data,
    isFetching,
    canAbort,
    aborted,
    abort,
    execute,
  };

  const shell: UseFetchReturn<T> = {
    ...base,

    get: setMethod('get'),
    put: setMethod('put'),
    post: setMethod('post'),
    delete: setMethod('delete'),

    json: setType('json'),
    text: setType('text'),
    blob: setType('blob'),
    arrayBuffer: setType('arrayBuffer'),
    formData: setType('formData'),
  };

  function setMethod(method: string) {
    return (payload?: unknown, payloadType?: PayloadType) => {
      if (!initialized) {
        config.method = method;
        config.payload = payload;
        config.payloadType =
          payloadType || typeof payload === 'string' ? 'text' : 'json';
        return shell as any;
      }
      return undefined;
    };
  }

  function setType(type: DataType) {
    return () => {
      if (!initialized) {
        config.type = type;
        return base as any;
      }
      return undefined;
    };
  }

  if (options.immediate) setTimeout(execute, 0);

  return shell;
}

function joinPaths(start: string, end: string): string {
  if (!start.endsWith('/') && !end.startsWith('/')) return `${start}/${end}`;

  return `${start}${end}`;
}

export default useFetch;

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

interface UseFetchReturnMethodConfigured<T> extends UseFetchReturnBase<T> {
  json<JSON = any>(): UseFetchReturnBase<JSON>;
  text(): UseFetchReturnBase<string>;
  blob(): UseFetchReturnBase<Blob>;
  arrayBuffer(): UseFetchReturnBase<ArrayBuffer>;
  formData(): UseFetchReturnBase<FormData>;
}

interface UseFetchReturn<T> extends UseFetchReturnMethodConfigured<T> {
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

import { ComputedRef, ref, unref } from 'vue';

export interface ClipboardOptions<Source> {
  navigator?: Navigator;
  read?: boolean;
  copy?: any;
  copiedDuring?: number;
  [x: string]: any;
}

export interface ClipboardReturn<Optional> {
  isSupported: boolean;
  text: ComputedRef<string>;
  copied: ComputedRef<boolean>;
  copy: Optional extends true
    ? (text?: string) => Promise<void>
    : (text: string) => Promise<void>;
}

export function useClipboard(
  options?: ClipboardOptions<undefined>
): ClipboardReturn<false>;

export function useClipboard(
  options: ClipboardOptions<string>
): ClipboardReturn<true>;

export function useClipboard(
  options: ClipboardOptions<string | undefined> = {}
): ClipboardReturn<boolean> {
  const {
    navigator = window.navigator,
    read = true,
    source,
    copiedDuring = 1500,
  } = options;

  const events: string[] = ['copy', 'cut'];
  const isSupported: boolean = Boolean(navigator && 'clipboard' in navigator);
  const text = ref<string | null>(null);
  const copied = ref<boolean>(false);
  const timeout = () =>
    setTimeout(() => {
      copied.value = false;
    }, copiedDuring);

  const updateText: () => void = () =>
    navigator.clipboard.readText().then((val: string) => {
      text.value = val;
    });

  if (isSupported && read) {
    for (const e of events) {
      document.addEventListener(e, updateText);
    }
  }

  const copy: (source: string) => void = async (source) => {
    const value = unref(source);
    if (isSupported && value !== null) {
      await navigator.clipboard.writeText(value);
      text.value = value;
      copied.value = true;
      timeout();
    }
  };

  return {
    isSupported,
    text: text as ComputedRef<string>,
    copied: copied as ComputedRef<boolean>,
    copy,
  };
}

import { defineComponent, ref, unref, watch } from 'vue';
import { useClipboard, useCss, useDebounce } from 'Components';

const Meditation = defineComponent({
  setup() {
    const input = ref<string | null>(null);
    const el = ref<HTMLElement | null>(null);

    const { isSupported, text, copy } = useClipboard();
    const color = useCss('--color', el);

    const switchColor = () => {
      if (color.value === '#df8543') color.value = '#7fa998';
      else color.value = '#df8543';
    };

    const [run, cancel] = useDebounce(switchColor, 1000);

    return () => (
      <>
        {isSupported && (
          <div>
            <p ref={el} style={'--color: #7fa998; color: var(--color)'}>
              Current copied: <code>{unref(text) ?? 'none'}</code>
            </p>
            <input v-model={input.value} type="text" />
            <button onClick={(copy(input), run)}>Copy</button>
          </div>
        )}
        {!isSupported && (
          <div> Your browser does not support Clipboard API</div>
        )}
      </>
    );
  },
});

export default Meditation;

import { defineComponent, ref, unref } from 'vue';
import { useClipboard } from 'Components';

const Meditation = defineComponent({
  setup() {
    const input = ref<string | null>(null);
    const { isSupported, text, copy } = useClipboard();

    return () => (
      <>
        {isSupported && (
          <div>
            <p>
              Current copied: <code>{unref(text) ?? 'none'}</code>
            </p>
            <input v-model={input.value} type="text" />
            <button onClick={copy(input)}>Copy</button>
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

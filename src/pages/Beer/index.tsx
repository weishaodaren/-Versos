import { defineComponent, Fragment, ref, computed } from 'vue';
import { WrappedInput, Button } from './style';

const List = [
  { name: 'A', aliasName: 'a' },
  { name: 'B', aliasName: 'b' },
  { name: 'C', aliasName: 'c' },
];
const Beer = defineComponent({
  name: 'Beer',
  components: { 'wrapped-input': WrappedInput, Button },
  setup() {
    const placeholder = ref<string>(`please input ur pwd...`);
    const inputVal = ref<string>(``);
    const inputValComputed = computed({
      get: () => inputVal.value,
      set: (value) => (inputVal.value = value + 1),
    });

    return () => (
      <Fragment>
        <wrapped-input
          placeholder={placeholder.value}
          v-model={inputValComputed.value}
        />
        <h2>This is fuckin beer</h2>
        <div>
          {List.map((el, index) => (
            <Fragment key={index}>
              <Button>{`${el.name} - ${el.aliasName}`}</Button>
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  },
});

export default Beer;

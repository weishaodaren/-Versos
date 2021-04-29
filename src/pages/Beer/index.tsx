import { defineComponent, Fragment, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { WrappedInput, Button } from './style';
import { constant } from 'lodash';
import { inRange, clamp, uniqueId, times } from '@/utils';

const List = [
  { name: 'A', aliasName: 'a' },
  { name: 'B', aliasName: 'b' },
  { name: 'C', aliasName: 'c' },
];
const Beer = defineComponent({
  name: 'Beer',
  components: { 'wrapped-input': WrappedInput, Button },
  setup() {
    const $router = useRouter();

    // const sample = inRange(-10, -19, 10);
    // const sample = random(-20, 20);
    // const sample = uniqueId('weishaodaren');
    const sample = times(100, constant({ name: 'weishaodaren ' }));
    console.log(sample, 'sample');

    const placeholder = ref<string>(`input ur GitHub userName...`);
    const inputVal = ref<string>(``);
    const inputValComputed = computed({
      get: () => inputVal.value,
      set: (value) => (inputVal.value = value),
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
              <Button
                onClick={() => {
                  if (index !== 0) return;
                  $router.push({
                    name: 'Meditation',
                    query: { github: inputValComputed.value },
                  });
                }}
              >{`${el.name} - ${el.aliasName}`}</Button>
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  },
});

export default Beer;

import { defineComponent, Fragment, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { WrappedInput, Button } from './style';
import {
  constant,
  bindAll,
  camelCase,
  capitalize,
  kebabCase,
  truncate,
  at,
  get,
  assign,
  merge,
  omit,
  set,
  // findKey,
  // after,
  before,
  defer,
  chunk,
  drop,
  intersection,
} from 'lodash';
import {
  inRange,
  clamp,
  uniqueId,
  times,
  invert,
  findKey,
  after,
} from '@/utils';

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
    const view = {
      label: 'docs',
      click: () => console.log(`clicked:${view.label}`),
      mouseDown: (args: string) => Number(args),
    };
    const demo = { a: [{ b: { c: 3 } }, 4] };
    // const sample = times(100, constant({ name: 'weishaodaren ' }));
    // const sample = bindAll(view);
    // const sample = camelCase('_A_B_C_D');
    // const sample = capitalize('WEISHAODAREN');
    // const sample = kebabCase('W E I S H A O D A R E N');
    // const sample = truncate('15821044438', { length: 4 });
    // const sample = Object.assign(view, { a: 'BB', label: 'xixix' });
    // const sample = at(demo, ['a[0].b.c', 'a[1]']);
    // const sample = get(demo, 'a.b.c', 'no');
    // const sample = invert({ a: 1, b: 2 });
    // let a = {
    //   a: [{ b: 2 }, { d: 4 }, { c: 88 }],
    // };

    // let b = {
    //   a: [{ c: 3 }, { e: 5 }],
    // };

    // let sample = merge(a, b);
    // let a = { a: 1, b: 2, c: true };
    // const sample = omit(a, ['c']);
    // const sample = set(demo, 'a[0].b.c.d', 'heihei');
    const a = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };
    const sample = findKey(a, (args: any) => args.age === 40);
    console.log(sample, 'sample');

    let aa = before(2, () => console.log(123321));
    aa();
    aa();
    aa();

    let bb = chunk(
      [
        { name: 'weishaodaren', age: 26, gender: true },
        { name: 'qinyue', age: 24, gender: false },
        { name: 'unknow', age: 0.02, gender: false },
      ],
      2
    );

    console.log(bb, 'this is chunk');
    let cc = drop(bb, 1);
    console.log(cc, 'this is drop');

    const demo01 = intersection([2, 1], [1, 4]);
    console.log(demo01, 'demo01');
    // intersection & fromPairs

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

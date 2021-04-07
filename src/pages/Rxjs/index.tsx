import { defineComponent } from 'vue';
import fromEvent from './fromEvent.vue';
import Observable from './observable';
import {
  Demo1,
  Ajax,
  CombineAll,
  CombineLatest,
  Concat,
  ConcatAll,
  ForkJoin,
} from './operators';

const RxJxFn = defineComponent({
  name: 'RxJxFn',
  components: {
    fromEvent,
    Observable,
    Demo1,
    Ajax,
    CombineAll,
    CombineLatest,
    Concat,
  },
  setup() {
    ForkJoin.B();
    return () => (
      <div>
        This is Rxjs
        {/* <from-event /> */}
        {/* <Observable /> */}
        {/* <Demo1 /> */}
        {/* <Ajax /> */}
        {/* <CombineAll /> */}
        {/* <CombineLatest /> */}
        {/* <Concat /> */}
      </div>
    );
  },
});

export default RxJxFn;

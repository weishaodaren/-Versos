import { defineComponent } from 'vue';
import fromEvent from './fromEvent.vue';
import Observable from './observable';
import { Demo1, Ajax, CombineAll, CombineLatest } from './operators';

const RxJxFn = defineComponent({
  name: 'RxJxFn',
  components: { fromEvent, Observable, Demo1, Ajax, CombineAll, CombineLatest },
  setup() {
    return () => (
      <div>
        This is Rxjs
        {/* <from-event /> */}
        {/* <Observable /> */}
        {/* <Demo1 /> */}
        {/* <Ajax /> */}
        {/* <CombineAll /> */}
        <CombineLatest />
        {/* <button>Red</button> */}
      </div>
    );
  },
});

export default RxJxFn;

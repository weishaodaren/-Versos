import { defineComponent } from 'vue';
import fromEvent from './fromEvent.vue';
import Observable from './observable';
import { Demo1 } from './operators';

const RxJxFn = defineComponent({
  name: 'RxJxFn',
  components: { fromEvent, Observable, Demo1 },
  setup() {
    return () => (
      <div>
        This is Rxjs
        {/* <from-event /> */}
        {/* <Observable /> */}
        <Demo1 />
      </div>
    );
  },
});

export default RxJxFn;

import { defineComponent } from 'vue';
import fromEvent from './fromEvent.vue';
import Observable from './observable';

const RxJxFn = defineComponent({
  name: 'RxJxFn',
  components: { fromEvent, Observable },
  setup() {
    return () => (
      <div>
        This is Rxjs
        <from-event />
        <Observable />
      </div>
    );
  },
});

export default RxJxFn;

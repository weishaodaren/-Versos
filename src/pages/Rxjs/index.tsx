import { defineComponent } from 'vue';
import Observable from './Observable.vue';

const RxJxFn = defineComponent({
  name: 'RxJxFn',
  components: { Observable },
  setup() {
    return () => (
      <div>
        This is Rxjs
        <Observable />
      </div>
    );
  },
});

export default RxJxFn;

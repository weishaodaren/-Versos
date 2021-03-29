import { defineComponent, Fragment } from 'vue';
import WrappedInput from './style';

const Beer = defineComponent({
  name: 'Beer',
  components: { 'wrapped-input': WrappedInput },
  setup() {
    return () => (
      <Fragment>
        <wrapped-input />
        <h2>This is fuckin beer</h2>
      </Fragment>
    );
  },
});

export default Beer;

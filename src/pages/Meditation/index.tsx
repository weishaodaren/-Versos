import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  watchEffect,
} from 'vue';
import { useFetch } from 'Hooks';
import { userType } from '@/types';

const Meditation = defineComponent({
  setup() {
    const url = ref('users/weishaodaren');
    const userData = reactive({
      data: {} as userType.UserData,
    });

    onBeforeMount(async () => {
      const { data, loading, run: runFetch } = useFetch({
        url,
        method: 'GET',
        immediate: false,
      });
      await runFetch();
      userData.data = data.value;
    });

    return () => (
      <>
        <div>{userData.data?.name}</div>
      </>
    );
  },
});

export default Meditation;

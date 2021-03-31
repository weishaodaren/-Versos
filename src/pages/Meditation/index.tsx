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
        <div>我是 {userData.data?.name}</div>
        <div>
          <img
            style={{ width: '45px', height: '45px' }}
            src={userData.data?.avatar_url as string}
            alt="avatar"
          />
        </div>
        <div>有{userData.data.followers}位绅士跟随我</div>
      </>
    );
  },
});

export default Meditation;

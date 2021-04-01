import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from 'vue';
import { useFetch } from 'Hooks';
import { userType } from '@/types';
import { Container, Avatar, Describe, Name, NickName, Profile } from './styles';

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

    onMounted(() => {
      document.body.style.backgroundColor = `#126`;
    });

    return () => (
      <Container>
        <Avatar src={userData.data?.avatar_url as string} />
        <Describe>
          <Name>{userData.data?.name}</Name>
          <NickName>{userData.data?.login}</NickName>
        </Describe>
        <Profile>
          <div>{userData.data?.bio}</div>
          <button>Edit profile</button>
          <div>
            {userData.data?.followers}followers
            {userData.data?.following}following
          </div>
        </Profile>
      </Container>
    );
  },
});

export default Meditation;

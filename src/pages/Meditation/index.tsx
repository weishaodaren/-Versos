import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  unref,
} from 'vue';
import { useStore } from 'vuex';
import { key } from '@/stores';
import { Container, Avatar, Describe, Name, NickName, Profile } from './styles';

const Meditation = defineComponent({
  setup() {
    const $store = useStore(key);
    const url = ref('users/weishaodaren');

    onBeforeMount(() =>
      $store.dispatch('getUserData', {
        url: unref(url),
        method: 'GET',
        immediate: false,
      })
    );

    onMounted(() => {
      document.body.style.backgroundColor = `#126`;
    });

    const { value: userData } = computed(() => $store.getters.userData);

    return () => (
      <Container>
        <Avatar src={userData.avatar_url as string} />
        <Describe>
          <Name>{userData?.name}</Name>
          <NickName>{userData?.login}</NickName>
        </Describe>
        <Profile>
          <div>{userData?.bio}</div>
          <button>Edit profile</button>
          <div>
            {userData?.followers} followers
            {userData?.following}following
          </div>
        </Profile>
      </Container>
    );
  },
});

export default Meditation;

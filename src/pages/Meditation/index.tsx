import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  unref,
  watch,
  watchEffect,
  nextTick,
  reactive,
} from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { key } from '@/stores';
import { userType } from '@/types';
import { Container, Avatar, Describe, Name, NickName, Profile } from './styles';

const Meditation = defineComponent({
  setup() {
    const $store = useStore(key);
    const $route = useRoute();
    const { github } = $route.query;
    const state = reactive({
      userData: {} as userType.UserData,
    });

    onBeforeMount(() =>
      $store.dispatch('getUserData', {
        url: unref(`users/${github}`),
        method: 'GET',
        immediate: false,
      })
    );

    onMounted(() => {
      document.body.style.backgroundColor = `#126`;
    });

    watchEffect(() => {
      const { value: userData } = computed(() => $store.getters.userData);
      state.userData = userData;
    });

    return () => (
      <Container>
        <Avatar src={state.userData.avatar_url as string} />
        <Describe>
          <Name>{state.userData?.name}</Name>
          <NickName>{state.userData?.login}</NickName>
        </Describe>
        <Profile>
          <div>{state.userData?.bio}</div>
          <button>Edit profile</button>
          <div>
            {state.userData?.followers} followers
            {state.userData?.following}following
          </div>
        </Profile>
      </Container>
    );
  },
});

export default Meditation;

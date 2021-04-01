import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { userType } from '@/types';
import { useFetch } from 'Hooks';

export interface IState {
  count: number;
  loginName: string | null;
  userData: userType.UserData;
}

export const key: InjectionKey<Store<IState>> = Symbol();
export const store = createStore<IState>({
  state: {
    count: 0,
    loginName: null,
    userData: {},
  },
  getters: {
    count: (state) => state.count,
    loginName: (state) => state.loginName,
    userData: (state) => state.userData,
  },
  mutations: {
    increment(state, payload) {
      if (typeof payload === 'number') state.count += payload;
      else if (typeof payload === 'object') state.count += payload.amount;
    },
    getUserName(state, payload) {
      return { ...state, ...payload };
    },
    getUserData(state, payload) {
      return (state.userData = { ...payload.value });
    },
  },
  actions: {
    increments({ commit }, payload) {
      commit('increment', payload);
    },
    getUserName({ commit }, payload) {
      commit('getUserName', payload);
    },
    async getUserData(ctx, payload) {
      const { data, run } = useFetch({
        ...payload,
      });
      await run();
      ctx.commit('getUserData', data);
    },
  },
  modules: {},
});

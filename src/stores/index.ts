import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { userType } from '@/types';
import { useFetch } from 'Hooks';

export interface IState {
  count: number;
  userData: userType.UserData;
  contributions: CanvasState | null;
}

export const key: InjectionKey<Store<IState>> = Symbol();
export const store = createStore<IState>({
  state: {
    count: 0,
    userData: {},
    contributions: null,
  },
  getters: {
    count: (state) => state.count,
    userData: (state) => state.userData,
    contributions: (state) => state.contributions,
  },
  mutations: {
    increment(state, payload) {
      if (typeof payload === 'number') state.count += payload;
      else if (typeof payload === 'object') state.count += payload.amount;
    },
    getContributions(state, payload) {},
    getUserData(state, payload) {
      state.userData = payload;
      return { ...state };
    },
  },
  actions: {
    increments({ commit }, payload) {
      commit('increment', payload);
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

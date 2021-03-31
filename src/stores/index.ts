import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface IState {
  count: number;
  [x: string]: string | number;
}

export const key: InjectionKey<Store<IState>> = Symbol();
export const store = createStore<IState>({
  state: {
    count: 0,
  },
  getters: {
    count: (state) => state.count,
  },
  mutations: {
    increment(state, payload) {
      if (typeof payload === 'number') state.count += payload;
      else if (typeof payload === 'object') state.count += payload.amount;
    },
  },
  actions: {
    increments({ commit }, payload) {
      commit('increment', payload);
    },
  },
  modules: {},
});

import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface IState {
  [x: string]: string | number;
}

export const key: InjectionKey<Store<IState>> = Symbol();
export const store = createStore<IState>({
  state: {
    count: 0,
  },
});

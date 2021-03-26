import { createApp } from 'vue';
import router from './router';
import { store, key } from './stores';
import App from './App.vue';

createApp(App).use(router).use(store, key).mount(`#app`);

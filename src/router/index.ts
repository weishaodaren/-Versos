import {
  createRouter,
  createWebHistory,
  RouteComponent,
  Router,
} from 'vue-router';

interface IRoutes {
  path: string;
  name: string;
  component: RouteComponent;
}

const routes: Array<IRoutes> = [
  { path: '/tea', name: 'Tea', component: () => import('Pages/Tea/index.vue') },
  {
    path: '/coffee',
    name: 'Coffee',
    component: () => import('Pages/Coffee/index.vue'),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

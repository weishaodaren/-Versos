import {
  createRouter,
  createWebHashHistory,
  RouteComponent,
  Router,
} from 'vue-router';
import Tea from 'Pages/Tea';
import Coffee from 'Pages/Coffee';

interface IRoutes {
  path: string;
  component: RouteComponent;
}

const routes: Array<IRoutes> = [
  { path: '/tea', component: Tea },
  { path: '/coffee', component: Coffee },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

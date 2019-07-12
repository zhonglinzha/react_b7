import loadable from '@loadable/component';

export default [
  {
    path: "/",
    exact: true,
    component: loadable(() => import( /* webpackPrefetch: true */ /* webpackChunkName: 'login' */'@page/login'))
  },
  {
    path: "/home",
    component: loadable(() => import( /* webpackPrefetch: true */ /* webpackChunkName: 'home' */'@page/home')),
  },
  {
    path: "/about",
    component: loadable(() => import( /* webpackPrefetch: true */ /* webpackChunkName: 'about' */'@page/about')),
  },
];
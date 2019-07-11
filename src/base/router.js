import loadable from '@loadable/component';

export default [
  {
    path: "/",
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'login' */'@page/login'))
  },
  {
    path: "/home",
    component: loadable(() => import(/* webpackChunkName: 'home' */'@page/home')),
  },
  {
    path: "/about",
    component: loadable(() => import(/* webpackChunkName: 'about' */'@page/about')),
  },
];
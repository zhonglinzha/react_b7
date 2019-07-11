import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component'

const Login = loadable(() => import(/* webpackChunkName: 'login' */'@page/login'));
const Home = loadable(() => import(/* webpackChunkName: 'home' */'@page/home'));
const About = loadable(() => import(/* webpackChunkName: 'about' */'@page/about'));

// import Login from '@page/login';
// import Home from '@page/home';
// import About from '@page/about';

const App = () => (
<React.Fragment>
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </Router>
</React.Fragment>
);

export default App;

import React from 'react';
import { Route, HashRouter as Router} from 'react-router-dom';

import Login from '@page/login';
import Home from '@page/home';
import About from '@page/about';


const App = () => 
    <React.Fragment>
        <Router>
            <Route path='/' exact component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}/>
        </Router>
    </React.Fragment>;

export default App;

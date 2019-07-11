import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './router';

const App = () => (
<React.Fragment>
    <Router>
        {renderRoutes(routes)}
    </Router>
</React.Fragment>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store';
import './index.scss';
window.addEventListener('resize', window.__setFontSize__);
const renderApp = () => {
	ReactDOM.render(
		<Provider store={store}>
			
		</Provider>,
		document.getElementById('root'),
	);
};
renderApp();
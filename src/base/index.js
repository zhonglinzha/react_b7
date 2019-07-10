import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import APP from './app';
import store from '@store';
import './index.scss';

window.addEventListener('resize', window.__setFontSize__);
const renderApp = () => {
	ReactDOM.render(
		<Provider store={store}>
			<APP />
		</Provider>,
		document.getElementById('root'),
	);
};
renderApp();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './redux/createStore';
import APIClient from './helpers/APIClient';
import routes from './routes';
import App from './containers/App';

const browserHistory = createBrowserHistory();
const client = new APIClient();
const store = createStore(browserHistory, client);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
	<Provider store={store} key="provider">
		<Router>
			<App>
				{ routes(store) }
			</App>
		</Router>
	</Provider>
);

ReactDOM.render(
	component,
	document.getElementById("app")
);

if (__DEV__ && module.hot) {
	module.hot.accept();
}

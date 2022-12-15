import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const store = createStore(history);

export const AppProviders = (props: PropsWithChildren<{}>) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>{props.children}</ConnectedRouter>
	</Provider>
);

import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import {
	configureStore,
	getDefaultMiddleware,
	Middleware,
} from '@reduxjs/toolkit';
import createRootReducer from './root/root.reducer';
import rootReducer from './root/root.reducer';
import rootSaga from './root/root.saga';
import logger from 'redux-logger';

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const createStore = (history: History) => {
	const sagaMiddleware = createSagaMiddleware();
	const getMiddleWares = () => {
		const middlewares: Middleware[] = [
			sagaMiddleware,
			routerMiddleware(history),
		];
		if (process.env.NODE_ENV === 'development') {
			middlewares.push(logger);
		}
		return middlewares;
	};
	const store = configureStore({
		reducer: createRootReducer(history),
		middleware: getDefaultMiddleware({
			serializableCheck: false,
		}).concat(...getMiddleWares()),
		devTools: true,
	});

	sagaMiddleware.run(rootSaga as any);

	return store;
};

export type StoreState = ReturnType<ReturnType<typeof rootReducer>>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
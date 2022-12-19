import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../user/user.reducer';
import appReducer from '../app/app.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export const RootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		app: appReducer,
	});

export default RootReducer;

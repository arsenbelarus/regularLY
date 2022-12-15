import { combineReducers } from '@reduxjs/toolkit';
import { reducer as notifications } from 'react-redux-toastr';
import userReducer from '../user/user.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export const RootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		toastr: notifications,
	});

export default RootReducer;

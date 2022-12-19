import { createAction } from 'redux-actions';
import { MainAlert } from './app.reducer';

export const showNotification = createAction<MainAlert>('app/TOGGLE_NOTIFICATION')
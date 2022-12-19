import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MainAlert = {
	type: 'error' | 'success' | 'warning' | 'info';
	title: string;
};

type AppState = {
	isAppReady: boolean;
	mainAlert: MainAlert & { isAlertVisible: boolean };
};

type Reducers = {
	setIsAppReady: CaseReducer<AppState, PayloadAction<boolean>>;
	setMainAlert: CaseReducer<AppState, PayloadAction<MainAlert>>;
	removeMainAlert: CaseReducer<AppState>;
};

const initialState: AppState = {
	isAppReady: false,
	mainAlert: {
		isAlertVisible: false,
		type: 'info',
		title: '',
	},
};

const slice = createSlice<AppState, Reducers, 'appReducer'>({
	name: 'appReducer',
	initialState,
	reducers: {
		setIsAppReady: (state, { payload }) => {
			state.isAppReady = payload;
		},
		setMainAlert: (state, { payload }) => {
			state.mainAlert.isAlertVisible = true;
			state.mainAlert.title = payload.title;
			state.mainAlert.type = payload.type;
		},
		removeMainAlert: (state) => {
			state.mainAlert.isAlertVisible = false;
		},
	},
	extraReducers: (builder) => {},
});

export const { setIsAppReady, setMainAlert, removeMainAlert } = slice.actions;

export default slice.reducer;

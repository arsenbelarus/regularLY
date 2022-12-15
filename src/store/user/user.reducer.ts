import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
	isLoading: boolean;
	email: string;
	displayName: string;
	photoURL: string;
	userId: string;
	userRefID: string;
};

type Reducers = {
	setUserInfo: CaseReducer<UserState, PayloadAction<UserState>>;
	toggleUserLoading: CaseReducer<UserState>;
	clearUserInfo: CaseReducer<UserState>;
	setPhotoURL: CaseReducer<UserState, PayloadAction<string>>;
};

const initialState: UserState = {
	isLoading: false,
	email: '',
	displayName: '',
	photoURL: '',
	userId: '',
	userRefID: '',
};

const slice = createSlice<UserState, Reducers, 'userReducer'>({
	name: 'userReducer',
	initialState,
	reducers: {
		setUserInfo: (state, { payload }) => {
			state.photoURL = payload.photoURL;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.userId = payload.userId;
			state.userRefID = payload.userRefID;
		},
		clearUserInfo: (state) => {
			state.email = '';
			state.displayName = '';
			state.photoURL = '';
			state.userId = '';
		},
		toggleUserLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setPhotoURL: (state, { payload }) => {
			state.photoURL = payload;
		},
	},
	extraReducers: (builder) => {},
});

export const { setUserInfo, clearUserInfo, toggleUserLoading, setPhotoURL } =
	slice.actions;

export default slice.reducer;

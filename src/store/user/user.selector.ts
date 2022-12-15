import { StoreState } from './../store';

export const userLoadingSelector = (store: StoreState) => store.user.isLoading;
export const userDisplayNameSelector = (store: StoreState) =>
	store.user.displayName;
export const userPhotoURLSelector = (store: StoreState) => store.user.photoURL;
export const userEmailSelector = (store: StoreState) => store.user.email;
export const userRefIdSelector = (store: StoreState) => store.user.userRefID;

export const userSelector = (store: StoreState) => ({
	displayName: store.user.displayName,
	email: store.user.email,
	photoURL: store.user.photoURL,
	userId: store.user.userId,
});

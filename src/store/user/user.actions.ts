import { createAction } from 'redux-actions';
import { SignInWithEmailPayload, SignUpWithEmailPayload } from './user.types';

export const signUpUserWithEmail = createAction<SignUpWithEmailPayload>(
	'user/SignUpWithEmail'
);

export const signInUserWithEmail = createAction<SignInWithEmailPayload>(
	'user/SignInWithEmail'
);

export const signInUserWithGoogle = createAction('user/SignInWithGoogle');

export const redirectUserTo = createAction<string>('user/redirectTo');

export const signOutUser = createAction('user/SignOut');

export const updateUserPhoto = createAction<File>('user/updateUserPhoto');
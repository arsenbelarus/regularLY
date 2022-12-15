import {
	firebaseAuth,
	firebaseDb,
	googleProvider,
	firebaseStorage,
	baseAssetsUrl,
} from './../../../appConfig';
import { put, takeEvery, call, select } from 'redux-saga/effects';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	doc,
	DocumentReference,
	CollectionReference,
	setDoc,
} from 'firebase/firestore/lite';
import { updateDoc } from 'firebase/firestore';
import {
	redirectUserTo,
	signInUserWithEmail,
	signInUserWithGoogle,
	signOutUser,
	signUpUserWithEmail,
	updateUserPhoto,
} from './user.actions';
import {
	clearUserInfo,
	setPhotoURL,
	setUserInfo,
	toggleUserLoading,
	UserState,
} from './user.reducer';
import { actions as notifications } from 'react-redux-toastr';
import { push as pushLocation } from 'connected-react-router';
import { ref, uploadBytes } from 'firebase/storage';
import { userRefIdSelector, userSelector } from './user.selector';

export function* handleSignUpWithEmail({
	payload,
}: ReturnType<typeof signUpUserWithEmail>) {
	const { email, password, displayName } = payload;
	try {
		yield put(toggleUserLoading());
		const { user } = yield call(
			createUserWithEmailAndPassword,
			firebaseAuth,
			email,
			password
		);
		if (user) {
			const usersRef = collection(firebaseDb, 'users');
			yield call(addDoc, usersRef, {
				email,
				displayName,
				userId: user.uid,
			});
			const userInfo = {
				email,
				displayName,
				photoURL: '',
				userRefID: '',
				userId: user.uid,
				isLoading: false,
			};
			yield put(setUserInfo(userInfo));
			yield call(
				[localStorage, localStorage.setItem],
				'user',
				JSON.stringify(userInfo)
			);
			yield put(pushLocation('/my-expenses'));
		}
	} catch (error: any) {
		yield call(handleError, error?.message);
	} finally {
		yield put(toggleUserLoading());
	}
}

export function* handleSignInWithEmail({
	payload,
}: ReturnType<typeof signInUserWithEmail>): any {
	yield put(toggleUserLoading());
	let userInfo: Omit<UserState, 'password'> = {
		email: '',
		displayName: '',
		photoURL: '',
		isLoading: false,
		userId: '',
		userRefID: '',
	};
	try {
		const { user } = yield call(
			signInWithEmailAndPassword,
			firebaseAuth,
			payload.email,
			payload.password
		);
		const { uid } = user;
		if (uid) {
			const usersRef = collection(firebaseDb, 'users');
			const q = query(usersRef, where('userId', '==', uid));
			const userSnapshot = yield call(getDocs, q);

			userSnapshot.forEach((doc: any) => {
				userInfo = doc.data();
				userInfo.userRefID = doc.id;
				console.log('0', doc.id);
			});
			yield put(
				setUserInfo({
					email: userInfo.email,
					displayName: userInfo.displayName,
					photoURL: userInfo.photoURL || '',
					isLoading: false,
					userId: userInfo.userId,
					userRefID: userInfo.userRefID,
				})
			);
			yield call(
				[localStorage, localStorage.setItem],
				'user',
				JSON.stringify(userInfo)
			);
			yield put(pushLocation('/my-expenses'));
		}
	} catch (error: any) {
		yield call(handleError, error?.message);
	} finally {
		yield put(toggleUserLoading());
	}
}

export function* handleSignInWithGoogle() {
	try {
		const { user } = yield call(signInWithPopup, firebaseAuth, googleProvider);
		if (user) {
			const { displayName, email, photoURL } = user;
			const userInfo = {
				displayName,
				email,
				photoURL,
				userId: '',
				isLoading: false,
				userRefID: '',
			};
			yield put(setUserInfo(userInfo));
			yield call(
				[localStorage, localStorage.setItem],
				'user',
				JSON.stringify(userInfo)
			);
			yield put(pushLocation('/my-expenses'));
		}
	} catch (error: any) {
		yield call(handleError, error?.message);
	}
}

export function* handleSignOut() {
	yield call(signOut, firebaseAuth);
	yield call([localStorage, localStorage.removeItem], 'user');
	yield put(clearUserInfo());
}

export function* handleRedirectUserTo({
	payload,
}: ReturnType<typeof redirectUserTo>) {
	yield put(pushLocation(payload));
}

export function* handleUpdateUserPhoto({
	payload,
}: ReturnType<typeof updateUserPhoto>) {
	const currentUserInfo: ReturnType<typeof userSelector> = yield select(
		userSelector
	);
	const storageRef = ref(firebaseStorage, payload.name);
	const { downloadTokens } = yield call(uploadBytes, storageRef, payload);
	const photoURL = `${baseAssetsUrl}/${payload.name}?alt=media&token=${downloadTokens}`;
	const userRefID: string = yield select(userRefIdSelector);
	const userRef: DocumentReference = doc(firebaseDb, 'users', userRefID);
	yield call(
		setDoc,
		userRef,
		{
			...currentUserInfo,
			photoURL,
		},
		{}
	);

	yield put(setPhotoURL(photoURL));
}

function* handleError(error: any) {
	const message = error?.split('/')[1]?.replace(').', '')?.toUpperCase();
	yield put(
		notifications.add({
			type: 'error',
			title: message,
		})
	);
}

export function* userSaga() {
	yield takeEvery(signUpUserWithEmail, handleSignUpWithEmail);
	yield takeEvery(signInUserWithEmail, handleSignInWithEmail);
	yield takeEvery(signInUserWithGoogle, handleSignInWithGoogle);
	yield takeEvery(signOutUser, handleSignOut);
	yield takeEvery(redirectUserTo, handleRedirectUserTo);
	yield takeEvery(updateUserPhoto, handleUpdateUserPhoto);
}

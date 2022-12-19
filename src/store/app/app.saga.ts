import { delay, put, takeEvery } from 'redux-saga/effects';
import { showNotification } from './app.action';
import { setMainAlert, removeMainAlert } from './app.reducer';

function* handleNotification({
	payload,
}: ReturnType<typeof showNotification>) {
	yield put(setMainAlert({ title: payload.title, type: payload.type }));
	yield delay(3000);
	yield put(removeMainAlert());
}

export function* appSaga() {
	yield takeEvery(showNotification, handleNotification);
}

import { put, takeEvery } from 'redux-saga/effects';
import { getErrorMessage, getMetaInfo } from '../../utils/errorHandler';
import { showNotification } from '../app/app.action';

export function* showErrorOnRejectedAction(action: any) {
	if (
		action.error?.message === 'request cancelled' ||
		action.error?.message === 'Aborted'
	)
		return;
	const { error, type, meta } = action;
	const docMeta = getMetaInfo(meta?.arg);
	yield put(
		showNotification({
			type: 'error',
			title: getErrorMessage(error, type, docMeta) as string,
		})
	);
}

export function* notificationsSaga() {
	yield takeEvery(
		(a: any) => a.type.toLowerCase().endsWith('rejected'),
		showErrorOnRejectedAction
	);
}
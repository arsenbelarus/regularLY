import { all, spawn, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { notificationsSaga } from './error.saga';
import { userSaga } from '../user/user.saga';
import { appSaga } from '../app/app.saga';
import { showNotification } from '../app/app.action';

export default function* rootSaga() {
	const sagas: any[] = [userSaga, notificationsSaga, appSaga];
	yield all(sagas.map((saga) => spawn(sagaLoop, saga)));
}

function* sagaLoop(saga: () => SagaIterator) {
	while (true) {
		try {
			yield call(saga);
			break;
		} catch (e: any) {
			yield put(
				showNotification({
					type: 'error',
					title: e.message || 'Something went wrong, try again later',
				})
			);
		}
	}
}

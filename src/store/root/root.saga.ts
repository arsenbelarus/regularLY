import { all, spawn, put, call } from 'redux-saga/effects';
import { actions as notifications } from 'react-redux-toastr';
import { SagaIterator } from 'redux-saga';
import { notificationsSaga } from './error.saga';
import { userSaga } from '../user/user.saga';

export default function* rootSaga() {
	const sagas: any[] = [userSaga, notificationsSaga];
	yield all(sagas.map((saga) => spawn(sagaLoop, saga)));
}

function* sagaLoop(saga: () => SagaIterator) {
	while (true) {
		try {
			yield call(saga);
			break;
		} catch (e: any) {
			yield put(
				notifications.add({
					type: 'error',
					title: e.message || 'Something went wrong, try again later',
				})
			);
		}
	}
}
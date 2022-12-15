import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../appConfig';
import { useAppDispatch } from '../store/store';
import { redirectUserTo } from '../store/user/user.actions';
import { Progress } from '../components/common/Progress';
import { setUserInfo } from '../store/user/user.reducer';
import ForbiddenPage from '../pages/ForbiddenPage';

export const WithAuthorization = (
	props: PropsWithChildren<{}>
): ReactElement | null => {
	const dispatch = useAppDispatch();

	const [isInitialized, setInitialized] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				const userInfo = localStorage.getItem('user');
				if (userInfo) {
					dispatch(setUserInfo(JSON.parse(userInfo)));
				}
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
				dispatch(redirectUserTo('/auth'));
			}
			setInitialized(true);
		});

		return () => unsubscribe();
	}, []);

	if (!isInitialized) return <Progress />;
	if (loggedIn && isInitialized) {
		return props.children as ReactElement;
	} else {
		return <ForbiddenPage />;
	}
};

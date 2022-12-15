import { Redirect, Route, Switch } from 'react-router-dom';
import { WithAuthorization } from '../hocs/WithAuthorization';
import AboutPage from '../pages/AboutPage';
import AuthPage from '../pages/AuthPage';
import MyRegularExpensesPage from '../pages/MyRegularExpensesPage';
import Profile from '../pages/Profile';

export const Router = () => {
	return (
		<Switch>
			<Route path={`/auth`} exact component={AuthPage} />
			<Route path={`/about`} exact component={AboutPage} />
			<Route
				path={`/my-expenses`}
				exact
				component={() => (
					<WithAuthorization>
						<MyRegularExpensesPage />
					</WithAuthorization>
				)}
			/>
			<Route
				path={`/profile`}
				exact
				component={() => (
					<WithAuthorization>
						<Profile />
					</WithAuthorization>
				)}
			/>
			<Route path='/' exact component={() => <Redirect to='about' />} />
		</Switch>
	);
};

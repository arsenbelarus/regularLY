import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import { AppProviders } from './AppProviders';
import Header from './components/header/Header';
import { Router } from './routes/Router';
import MainAlert from './components/common/Alert';

const Background = styled.div`
	background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
`;

export const App = () => {
	return (
		<AppProviders>
			<Background>
				<MainAlert />
				<Header />
				<Container maxWidth='sm'>
					<Router />
				</Container>
			</Background>
		</AppProviders>
	);
};

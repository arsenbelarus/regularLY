import { AppBar, Box, Toolbar, Container } from '@mui/material';
import NavigationMenu from './Navigation';
import Logo from './Logo';
import User from './User';

const Header = () => {
	return (
		<AppBar sx={{ backgroundColor: '#b08084' }} position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							flex: 1,
							alignItems: 'center',
						}}
					>
						<Logo />
						<NavigationMenu />
					</Box>
					<Box
						sx={{
							display: { xs: 'flex', md: 'none' },
							flex: 1,
							alignItems: 'center',
						}}
					>
						<NavigationMenu />
						<Logo />
					</Box>
					<User />
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;

import { useState } from 'react';
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const pages = [
	{ title: 'About', to: '/about' },
	{ title: 'My expenses', to: '/my-expenses' },
];

const NavigationMenu = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{pages.map((page) => (
					<Link
						key={page.title}
						to={page.to}
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							{page.title}
						</Button>
					</Link>
				))}
			</Box>

			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					onClick={handleOpenNavMenu}
					color='inherit'
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id='menu-appbar'
					anchorEl={anchorElNav}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={Boolean(anchorElNav)}
					onClose={handleCloseNavMenu}
					sx={{
						display: { xs: 'block', md: 'none' },
					}}
				>
					{pages.map((page) => (
						<Link
							key={page.title}
							to={page.to}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center'>{page.title}</Typography>
							</MenuItem>
						</Link>
					))}
				</Menu>
			</Box>
		</>
	);
};

export default NavigationMenu;

import {
	Box,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { redirectUserTo, signOutUser } from '../../store/user/user.actions';
import {
	userDisplayNameSelector,
	userPhotoURLSelector,
} from '../../store/user/user.selector';

const User = () => {
	const dispatch = useAppDispatch();
	const displayName = useAppSelector(userDisplayNameSelector);
	const photoURL = useAppSelector(userPhotoURLSelector);

	const settings = [
		{
			title: 'Profile',
			clb: () => {
				dispatch(redirectUserTo('/profile'));
			},
		},
		displayName
			? { title: 'Logout', clb: () => dispatch(signOutUser()) }
			: {
					title: 'Login',
					clb: () => {
						dispatch(redirectUserTo('/auth'));
					},
			  },
	];

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title={displayName || 'Open settings'}>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar
						alt={displayName}
						src={photoURL}
						sx={{
							bgcolor: displayName && deepPurple[500],
						}}
					>
						{displayName.at(0)}
					</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (
					<MenuItem
						key={setting.title}
						onClick={() => {
							setting.clb();
							handleCloseUserMenu();
						}}
					>
						<Typography textAlign='center'>{setting.title}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};

export default User;

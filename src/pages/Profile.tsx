import { useAppDispatch, useAppSelector } from '../store/store';
import Container from '../components/common/Container';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { deepPurple, lightBlue } from '@mui/material/colors';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	userDisplayNameSelector,
	userEmailSelector,
	userPhotoURLSelector,
} from '../store/user/user.selector';
import { ChangeEvent } from 'react';
import { updateUserPhoto } from '../store/user/user.actions';

const Profile = () => {
	const dispatch = useAppDispatch();
	const displayName = useAppSelector(userDisplayNameSelector);
	const photoURL = useAppSelector(userPhotoURLSelector);
	const email = useAppSelector(userEmailSelector);

	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!!e?.target?.files?.length) {
			dispatch(updateUserPhoto(e?.target?.files[0]));
		}
	};

	return (
		<Container>
			<Typography
				variant='h4'
				textTransform='uppercase'
				fontWeight='bold'
				marginTop='5vh'
			>
				Profile Info
			</Typography>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					gap: '5vw',
					flex: 1,
					marginTop: '5vh',
				}}
			>
				<Box
					sx={{
						position: 'relative',
						display: 'flex',
						gap: '5vw',
						width: '100%',
					}}
				>
					<Avatar
						src={photoURL}
						alt={displayName}
						sx={{
							width: 96,
							height: 96,
							bgcolor: deepPurple[500],
							fontSize: 48,
						}}
					>
						{displayName.at(0)}
					</Avatar>
					<IconButton
						sx={{
							position: 'absolute',
							left: 65,
							top: 60,
							color: lightBlue[100],
							cursor: 'pointer',
						}}
						color='inherit'
						aria-label='upload picture'
						component='label'
					>
						<input
							hidden
							accept='image/*'
							type='file'
							onChange={uploadHandler}
							multiple={false}
						/>
						<PhotoCamera />
					</IconButton>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flex: 1,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								gap: '2vw',
								alignItems: 'center',
							}}
						>
							<Typography
								variant='subtitle1'
								letterSpacing='2px'
								textTransform='uppercase'
								fontWeight='bold'
							>
								Name:
							</Typography>
							<Typography
								variant='body1'
								letterSpacing='1px'
								textTransform='uppercase'
							>
								{displayName}
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '2vw',
							}}
						>
							<Typography
								variant='subtitle1'
								letterSpacing='2px'
								textTransform='uppercase'
								fontWeight='bold'
							>
								Email:
							</Typography>
							<Typography
								variant='body1'
								letterSpacing='1px'
								textTransform='uppercase'
							>
								{email || 'No email provided'}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default Profile;

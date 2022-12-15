import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<Typography
					variant='h6'
					color='whitesmoke'
					textTransform='uppercase'
					textAlign='center'
				>
					Sorry This page is only
				</Typography>
				<Typography
					variant='h6'
					color='whitesmoke'
					textTransform='uppercase'
					textAlign='center'
				>
					available to authorized users
				</Typography>
				<Link
					to='/auth'
					style={{
						textDecoration: 'none',
						color: 'inherit',
					}}
				>
					<Button variant='contained' color='error'>
						Back to Sign In Page
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default ForbiddenPage;

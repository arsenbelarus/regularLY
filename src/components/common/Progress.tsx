import { Box, CircularProgress } from "@mui/material";

export const Progress = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
				color: 'white',
			}}
		>
			{' '}
			<CircularProgress color='inherit' size={48} />{' '}
		</Box>
	);
};
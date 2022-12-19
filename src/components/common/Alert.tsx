import { Slide, Snackbar } from '@mui/material';
import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { mainAlertStateSelector } from '../../store/app/app.selector';
import { removeMainAlert } from '../../store/app/app.reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const MainAlert = () => {
	const dispatch = useAppDispatch();
	const mainAlertState = useAppSelector(mainAlertStateSelector);

	const handleClose = () => dispatch(removeMainAlert());

	return (
		<Snackbar
			open={mainAlertState.isAlertVisible}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Slide
				direction='right'
				in={mainAlertState.isAlertVisible}
				mountOnEnter
				unmountOnExit
			>
				<Alert
					onClose={handleClose}
					severity={mainAlertState.type}
					sx={{ width: '100%' }}
				>
					{mainAlertState.title}
				</Alert>
			</Slide>
		</Snackbar>
	);
};

export default MainAlert;

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store/store';
import { userLoadingSelector } from '../../store/user/user.selector';

const BackdropSpinner = () => {
    const isOpen = useAppSelector(userLoadingSelector)

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isOpen}
		>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};

export default BackdropSpinner;

import styled from '@emotion/styled';
import { Button, TextField, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../store/store';
import {
	signInUserWithEmail,
	signInUserWithGoogle,
	signUpUserWithEmail,
} from '../store/user/user.actions';
import {
	SignInWithEmailPayload,
	SignUpWithEmailPayload,
} from '../store/user/user.types';
import BackdropSpinner from '../components/common/BackdropSpinner';
import Container from '../components/common/Container';

const AuthPage = () => {
	const initialFormValues = {
		email: {
			value: '',
			isValid: true,
			validationMessage: '',
		},
		password: {
			value: '',
			isValid: true,
			validationMessage: '',
		},
		displayName: {
			value: '',
			isValid: true,
			validationMessage: '',
		},
	};
	const [formValues, setFormValues] = useState(initialFormValues);
	const [needAccount, setNeedAccount] = useState(false);

	const dispatch = useAppDispatch();

	const clearForm = () => {
		setFormValues(initialFormValues);
	};

	const handleFormValuesChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormValues((prevState) => {
			return {
				...prevState,
				[e.target.name]: {
					value: e.target.value,
					isValid: getIsValid(e.target.name, e.target.value),
					validationMessage: getValidationMessage(
						e.target.name,
						e.target.value
					),
				},
			};
		});
	};

	const getIsValid = (name: string, value: string) => {
		if (name === 'email' && !!value) {
			const validRegex =
				/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{2,3})))*$/;
			return validRegex.test(value);
		}
		if (name === 'password' && !!value) {
			return value.length >= 6;
		}
	};

	const getValidationMessage = (name: string, value: string) => {
		if (name === 'email' && value) {
			return 'Please enter valid email address';
		}
		if (name === 'password' && value) {
			return 'Password should be at least 6 chars long';
		}
	};

	const handleEmailAuth = () => {
		let credentials = {};
		if (needAccount) {
			credentials = {
				email: formValues.email.value,
				password: formValues.password.value,
				displayName: formValues.displayName.value,
			};
			dispatch(signUpUserWithEmail(credentials as SignUpWithEmailPayload));
		} else {
			credentials = {
				email: formValues.email.value,
				password: formValues.password.value,
			};
			dispatch(signInUserWithEmail(credentials as SignInWithEmailPayload));
		}
		clearForm();
	};

	const isAuthButtonDisabled =
		!formValues.email.isValid ||
		!formValues.password.isValid ||
		!formValues.email.value ||
		!formValues.password.value ||
		(needAccount && !formValues.displayName.value);

	const handleGoogleAuth = () => {
		dispatch(signInUserWithGoogle());
	};

	return (
		<Container>
			<BackdropSpinner />
			<Typography style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
				{needAccount
					? 'Enter credentials to Sign up'
					: 'Enter credentials to Log in'}
			</Typography>
			<TextField
				required
				fullWidth
				name='email'
				value={formValues.email.value}
				onChange={(e) => handleFormValuesChange(e)}
				label='E-mail'
				error={!formValues.email.isValid}
				helperText={
					!formValues.email.isValid && formValues.email.validationMessage
				}
				autoComplete='off'
			/>
			<TextField
				required
				fullWidth
				name='password'
				type='password'
				value={formValues.password.value}
				onChange={(e) => handleFormValuesChange(e)}
				label='Password'
				error={!formValues.password.isValid}
				helperText={
					!formValues.password.isValid && formValues.password.validationMessage
				}
				autoComplete='off'
			/>
			{needAccount && (
				<TextField
					required
					fullWidth
					name='displayName'
					value={formValues.displayName.value}
					onChange={(e) => handleFormValuesChange(e)}
					label='Shown Name'
					autoComplete='off'
				/>
			)}
			<Button
				fullWidth
				disabled={isAuthButtonDisabled}
				variant='contained'
				onClick={handleEmailAuth}
			>
				{needAccount ? 'Sign up' : 'Log in'}
			</Button>
			<Typography variant='caption'>
				{needAccount ? 'Already have an account? ' : "Don't have an account? "}
				<SignUp onClick={() => setNeedAccount(!needAccount)}>
					{needAccount ? 'Log in' : 'Sign up'}
				</SignUp>
			</Typography>
			<Typography variant='caption' style={{ textTransform: 'uppercase' }}>
				Or log in using Google Account
			</Typography>
			<Social onClick={handleGoogleAuth}>
				<GoogleIcon />
			</Social>
		</Container>
	);
};

export default AuthPage;

const SignUp = styled.span`
	color: #5a5adb;
	text-transform: uppercase;
	cursor: pointer;
`;
const Social = styled.div`
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5px 0;

	border-radius: 5px;
	box-shadow: 0 2px 7px 1px grey;

	background-color: #000;
	cursor: pointer;

	&:hover {
		background-color: #2e2d2b;
	}
`;

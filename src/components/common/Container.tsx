import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
	margin: 0 auto;

	display: flex;
	max-width: 80vw;
	height: calc(100vh - 68.5px);

	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	color: white;

	& label {
		color: white;

		&:focus {
			color: white;
		}

		&:active {
			color: white;
		}
	}

	& input {
		color: white;
	}
`;

const Container = (props: PropsWithChildren<{}>) => {
	return <StyledContainer>{props.children}</StyledContainer>;
};

export default Container;

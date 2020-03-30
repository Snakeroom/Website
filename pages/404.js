import Head from "next/head";
import styled from "styled-components";
import Logo from "../components/logo";

const StyledLogo = styled(Logo)`
	filter: grayscale();
	margin-top: 1rem;
	opacity: 0.5;
	width: 8rem;
`;

const Container = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
`;

const Title = styled.h1`
	align-items: center;
	align-self: center;
	color: ${(props) => props.theme.colors.primaryMuted};
	display: flex;
	flex-direction: column;
	font-weight: normal;
`;

export default () => (
	<>
		<Head>
			<title>Not Found - The Snakeroom</title>
		</Head>
		<Container>
			<Title>
				Page not found. <StyledLogo />
			</Title>
		</Container>
	</>
);

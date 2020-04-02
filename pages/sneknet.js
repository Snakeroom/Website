import Head from "next/head";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const BoldButton = styled.a`
	background: none;
	border: 0;
	cursor: pointer;
	outline: 0;
	display: block;

	text-decoration: unset;
	font-size: 2rem;
	text-align: center;

	color: ${(props) => props.theme.colors.primary};
	background-color: ${(props) => props.theme.colors.accent};

	padding: 8px;
	border-radius: 16px;
	max-width: 50%;
	margin-left: 25%;

	.svg-inline--fa {
		margin-right: 0.75rem;
		height: 2rem;
		width: 2rem;
	}
`;

export default () => (
	<>
		<Head>
			<title>Sneknet - The Snakeroom</title>
		</Head>
		<BoldButton href="https://api.snakeroom.org/identity/reddit/login?return_to=https%3A%2F%2Fsnakeroom.org%2Fsneknet">
			<FontAwesomeIcon icon={faLock} />
			Log in to Sneknet
		</BoldButton>
	</>
);

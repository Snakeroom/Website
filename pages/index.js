import Head from "next/head";
import styled from "styled-components";

const Hero = styled.div``;

const Blurb = styled.p`
	font-size: 3.5rem;
	margin-left: auto;
	margin-right: auto;
	max-width: 60rem;
	text-align: center;
`;

export default () => (
	<>
		<Head>
			<title>Home - The Snakeroom</title>
		</Head>
		<Hero>
			<Blurb>
				<strong>The Snakeroom</strong> is an organization dedicated to
				solving and discussing <strong>Reddit's</strong> yearly{" "}
				<strong>April Fools events</strong> and official Reddit-run{" "}
				<strong>ARGs</strong> — both before and while they happen.
			</Blurb>
		</Hero>
	</>
);

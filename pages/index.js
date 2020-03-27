import styled from "styled-components";

const Blurb = styled.p`
	font-size: 2rem;
	text-align: right;
	margin-left: auto;
	max-width: 28rem;
`;

export default () => (
	<Blurb>
		<strong>The Snakeroom</strong> is an organization dedicated to solving
		and discussing <strong>Reddit's</strong> yearly{" "}
		<strong>April Fools events</strong> and official Reddit-run{" "}
		<strong>ARGs</strong> — both before and while they happen.
	</Blurb>
);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const StyledAnchor = styled.a`
	align-items: center;
	align-self: flex-end;
	background: #7289da;
	bottom: 1rem;
	border-radius: 0.25rem;
	box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.25);
	color: #fff;
	display: flex;
	flex: 0;
	margin-right: -1rem;
	margin-top: auto;
	padding: 0.5rem;
	position: sticky;
	text-decoration: none;
	transition: all 0.25s;

	&:hover,
	&:focus,
	&:active {
		background: #5e78d5;
		box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.5);
	}

	.svg-inline--fa {
		height: 2rem;
		margin-right: 0.5rem;
		width: 2rem;
	}
`;

const DiscordNag = () => (
	<StyledAnchor href="https://discord.gg/CNahEjU">
		<FontAwesomeIcon icon={faDiscord} />
		Join our Discord!
	</StyledAnchor>
);

export default DiscordNag;

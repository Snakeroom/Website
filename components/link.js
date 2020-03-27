import NextLink from "next/link";
import styled from "styled-components";

const StyledAnchor = styled.a`
	color: ${(props) => props.theme.colors.accent};
	display: inline-flex;
	text-decoration: none;

	&:hover,
	&:focus,
	&:active {
		text-decoration: underline;
	}

	${(props) => props.active && "font-weight: bold;"}
`;

const Link = ({ active, children, className, ...props }) => (
	<NextLink {...props} passHref>
		<StyledAnchor active={active} className={className}>
			{children}
		</StyledAnchor>
	</NextLink>
);

export default Link;

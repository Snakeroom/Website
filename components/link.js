import NextLink from "next/link";
import styled from "styled-components";

const StyledAnchor = styled(NextLink)`
	color: ${(props) => props.theme.colors.accent};
	display: inline-flex;
	text-decoration: none;

	&:hover,
	&:active {
		text-decoration: underline;
	}
`;

const ActiveStyledAnchor = styled(StyledAnchor)`
	font-weight: bold;
`;

function Link({ active, children, className, href, title, ...props }) {
	const Anchor = active ? ActiveStyledAnchor : StyledAnchor;

	return (
		<Anchor {...props} href={href} passHref className={className}>
			{children}
		</Anchor>
	);
}

export default Link;

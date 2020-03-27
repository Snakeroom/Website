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

const Link = ({ active, children, className, href, ...props }) =>
	href[0] === "/" ? (
		<NextLink {...props} href={href} passHref>
			<StyledAnchor active={active} className={className}>
				{children}
			</StyledAnchor>
		</NextLink>
	) : (
		<StyledAnchor active={active} className={className} href={href}>
			{children}
		</StyledAnchor>
	);

export default Link;

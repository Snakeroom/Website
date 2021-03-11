import NextLink from "next/link";
import styled from "styled-components";

const StyledAnchor = styled.a`
	color: ${(props) => props.theme.colors.accent};
	display: inline-flex;
	text-decoration: none;

	&:hover,
	&:active {
		text-decoration: underline;
	}

	${(props) => props.active && "font-weight: bold;"}
`;

const Link = ({ active, children, className, href, title, ...props }) =>
	href[0] === "/" ? (
		<div title={title}>
			<NextLink {...props} href={href} passHref>
				<StyledAnchor active={active} className={className}>
					{children}
				</StyledAnchor>
			</NextLink>
		</div>
	) : (
		<StyledAnchor active={active} className={className} href={href} title={title}>
			{children}
		</StyledAnchor>
	);

export default Link;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import Link from "./link";

const HiddenInput = styled.input`
	display: none;
`;

const elementStyle = css`
	display: inline-block;

	user-select: none;
	cursor: pointer;

	margin: 10px 0;
	padding: 10px;

	font-size: calc(40px / 3);

	border-radius: 2px;
	border: 1px solid
		${(props) => props.theme.colors[props.danger ? "danger" : "primary"]};

	transition: background-color 0.25s, color 0.25s;

	background-color: ${(props) =>
		props.theme.colors[props.danger ? "danger" : "primary"]};
	color: ${(props) => props.theme.colors.background};

	&:hover {
		background-color: ${(props) => props.theme.colors.background};
		color: ${(props) =>
			props.theme.colors[props.danger ? "danger" : "primary"]};
	}
`;

const IconButtonLabel = styled.label`
	${elementStyle}
`;

export function InputIconButton({
	icon,
	danger,
	children,
	inputRef,
	...props
}) {
	return (
		<IconButtonLabel danger={danger}>
			<FontAwesomeIcon icon={icon} />
			<HiddenInput ref={inputRef} {...props} /> {children}
		</IconButtonLabel>
	);
}

const IconButtonLink = styled(Link)`
	${elementStyle}

	&:hover {
		text-decoration: none;
	}
`;

export function LinkIconButton({ icon, danger, children, href }) {
	return (
		<IconButtonLink href={href} danger={danger}>
			<FontAwesomeIcon icon={icon} /> {children}
		</IconButtonLink>
	);
}

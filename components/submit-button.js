import styled from "styled-components";

export const InlineStyledInput = styled.input`
	border: 1px solid ${(props) => props.theme.colors.primary};
	border-radius: 2px;
	padding: 2px;
`;

export const StyledInput = styled(InlineStyledInput)`
	margin: 10px 0;
	padding: 10px;
	display: block;
`;

const SubmitButton = styled(StyledInput)`
	cursor: pointer;
	transition: background-color 0.25s, color 0.25s;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.background};

	&:hover {
		background-color: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.primary};
	}
`;
export default SubmitButton;

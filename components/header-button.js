import styled from "styled-components";

const HeaderButton = styled.button`
	background: none;
	border: 0;
	cursor: pointer;
	outline: 0;

	.svg-inline--fa {
		height: 1rem;
		width: 1rem;

		path {
			fill: ${(props) => props.theme.colors.primary};
		}
	}
`;

export default HeaderButton;

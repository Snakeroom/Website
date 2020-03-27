import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html, body {
		background-color: ${(props) => props.theme.colors.background};
		font-family: "Rubik", -apple-system, BlinkMacSystemFont, Segoe UI,
					Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
					Helvetica Neue, sans-serif;;
		font-size: 16px;
	}
`;

export default GlobalStyle;

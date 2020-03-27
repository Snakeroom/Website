import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../lib/theme";

const StyledButton = styled.button`
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

const ThemeSwitcher = () => {
	const [theme, setTheme] = useContext(ThemeContext);
	const toggleTheme = () => {
		if (theme.name === "light") setTheme("dark");
		else setTheme("light");
	};

	return (
		<StyledButton onClick={toggleTheme}>
			<FontAwesomeIcon
				icon={theme.name === "light" ? faMoonRegular : faMoonSolid}
			/>
		</StyledButton>
	);
};

export default ThemeSwitcher;

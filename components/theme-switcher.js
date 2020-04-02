import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../lib/theme";
import HeaderButton from "./header-button";

const ThemeSwitcher = () => {
	const [theme, setTheme] = useContext(ThemeContext);
	const toggleTheme = () => {
		if (theme.name === "light") setTheme("dark");
		else setTheme("light");
	};

	return (
		<HeaderButton onClick={toggleTheme} aria-label="Toggle dark mode">
			<FontAwesomeIcon
				icon={theme.name === "light" ? faMoonRegular : faMoonSolid}
			/>
		</HeaderButton>
	);
};

export default ThemeSwitcher;

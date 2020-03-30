import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../theme";

const useTheme = () => {
	const [theme, setTheme] = useState("light");

	// On mount, check local storage then system preference
	useEffect(() => {
		const userTheme = localStorage.getItem("theme");
		const systemTheme =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		setTheme(userTheme || systemTheme);
	}, []);

	// On theme change, save to local storage
	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	return [theme === "light" ? lightTheme : darkTheme, setTheme];
};

export default useTheme;

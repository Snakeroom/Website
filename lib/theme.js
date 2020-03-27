import React from "react";

export const ThemeContext = React.createContext();

export const lightTheme = {
	name: "light",
	colors: {
		accent: "#557528",
		background: "#ffffff",
		muted: "#888",
		primary: "#000",
	},
};

export const darkTheme = {
	name: "dark",
	colors: {
		accent: "#78ab32",
		background: "#121212",
		muted: "#888",
		primary: "#fff",
	},
};

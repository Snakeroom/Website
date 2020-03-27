import React from "react";

export const ThemeContext = React.createContext();

export const lightTheme = {
	name: "light",
	colors: {
		accent: "#557528",
		background: "#ffffff",
		backgroundMuted: "#eee",
		primary: "#000",
		primaryMuted: "#888",
	},
};

export const darkTheme = {
	name: "dark",
	colors: {
		accent: "#78ab32",
		background: "#121212",
		primary: "#fff",
		primaryMuted: "#888",
	},
};

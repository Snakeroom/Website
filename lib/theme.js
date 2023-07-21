import React from "react";

export const ThemeContext = React.createContext();

export const lightTheme = {
	name: "light",
	colors: {
		accent: "#557528",
		background: "#ffffff",
		backgroundMuted: "#eee",
		danger: "#ff7777",
		cardImageBackgroundGradient: "#00000022",
		primary: "#000",
		primaryMuted: "#888",
		primaryVeryMuted: "#eee",
	},
};

export const darkTheme = {
	name: "dark",
	colors: {
		accent: "#78ab32",
		background: "#121212",
		backgroundMuted: "#1f1f1f",
		cardImageBackgroundGradient: "#ffffff22",
		danger: "#ff7777",
		primary: "#fff",
		primaryMuted: "#888",
		primaryVeryMuted: "#191919",
	},
};

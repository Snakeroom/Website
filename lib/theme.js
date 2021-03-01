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
		accent: "#79a042",
		background: "#292c33",
		backgroundMuted: "#1f2027",
		primary: "#ddd",
		primaryMuted: "#888",
	},
};

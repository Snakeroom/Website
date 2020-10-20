import Head from "next/head";

import { useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Layout from "../components/layout";
import GlobalStyle from "../lib/global-style";
import { ThemeContext } from "../lib/theme";
import { authReducer } from "../lib/ducks/auth";
import useTheme from "../lib/hooks/useTheme";
import { StateContext } from "../lib/state";
import { makeApiRequest } from "../lib/api";

config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
	const [theme, setTheme] = useTheme();
	const [userState, dispatch] = useReducer(authReducer, {});

	useEffect(() => {
		makeApiRequest("/identity/@me")
			.then((res) => res.json().then((data) => ({ data, ok: res.ok })))
			.then(({ data, ok }) => {
				if (ok) {
					dispatch({ type: "restore", user: data });
				} else {
					throw new Error(data.error);
				}
			})
			.catch(() => {
				// Ignore for now. Flash warning in future?
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>The Snakeroom</title>
				<meta
					name="description"
					content="The Snakeroom is an organization dedicated to solving and
							discussing Reddit's yearly April Fools events and official
							Reddit-run ARGs — both before and while they happen."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta name="theme-color" content={theme.colors.background} />
				<link
					rel="apple-touch-icon"
					href="/icons/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
				/>
			</Head>
			<GlobalStyle />
			<ThemeContext.Provider value={[theme, setTheme]}>
				<StateContext.Provider value={userState}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StateContext.Provider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
};

export default App;

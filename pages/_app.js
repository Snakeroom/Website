import Head from "next/head";

import { useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Layout from "../components/layout";
import GlobalStyle from "../lib/global-style";
import { ThemeContext } from "../lib/theme";
import authReducer from "../lib/ducks/auth";
import useTheme from "../lib/hooks/useTheme";
import StateContext from "../lib/state";
import { makeApiRequest } from "../lib/api";

config.autoAddCss = false;

function App({ Component, pageProps }) {
	const themeHook = useTheme();
	const [theme] = themeHook;

	const [userState, dispatch] = useReducer(
		{
			outdated: true,
		},
		authReducer
	);

	const props = {
		...pageProps,
		dispatch,
	};

	useEffect(() => {
		if (!userState.outdated) return;

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
	}, [userState.outdated]);

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
			</Head>
			<GlobalStyle />
			<ThemeContext.Provider value={themeHook}>
				<StateContext.Provider value={userState}>
					<Layout>
						<Component {...props} />
					</Layout>
				</StateContext.Provider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default App;

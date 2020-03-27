import Head from "next/head";

import { ThemeProvider } from "styled-components";
import useTheme from "../lib/hooks/useTheme";
import Layout from "../components/layout";
import GlobalStyle from "../lib/global-style";
import { ThemeContext } from "../lib/theme";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
	const [theme, setTheme] = useTheme();

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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
};

export default App;

import Head from "next/head";

import { ThemeProvider } from "styled-components";
import useTheme from "../lib/hooks/useTheme";
import Layout from "../components/layout";
import GlobalStyle from "../lib/global-style";

const App = ({ Component, pageProps }) => {
	const [theme, setTheme] = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
};

export default App;

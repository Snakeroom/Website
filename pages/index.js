import Head from "next/head";
import { Blurb, Hero } from "../lib/common-style";

export default () => (
	<>
		<Head>
			<title>Home - The Snakeroom</title>
		</Head>
		<Hero>
			<Blurb>
				<strong>The Snakeroom</strong> is an organization dedicated to
				solving and discussing <strong>Reddit&apos;s</strong> yearly{" "}
				<strong>April Fools events</strong> and official Reddit-run{" "}
				<strong>ARGs</strong> — both before and while they happen.
			</Blurb>
		</Hero>
	</>
);

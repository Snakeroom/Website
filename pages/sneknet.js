import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { makeApiRequest } from "../lib/api";
import { StateContext } from "../lib/state";
import { Box, PageTitle } from "../lib/common-style";

const Content = styled.div`
	font-size: 1rem;
`;

const TokenList = styled.table`
	margin-top: 1rem;
	line-height: 1.5rem;
`;

const Row = styled.tr`
	text-decoration: ${(props) => (props.active ? "none" : "line-through")};
`;

const TokenField = styled.td`
	padding: 0 10px;
`;

const Token = ({ token }) => (
	<Row active={token.active}>
		<TokenField>{token.name}</TokenField>
		<TokenField>
			<code>{token.truncated_value}...</code>
		</TokenField>
		<TokenField>{token.whitelisted_address}</TokenField>
	</Row>
);

export default () => {
	const [tokens, setTokens] = useState([]);

	useEffect(() => {
		makeApiRequest("/sneknet/tokens")
			.then((res) => res.json())
			.then((data) => {
				if (data.tokens) {
					setTokens(data.tokens);
				}
			});
	}, []);

	if (!StateContext._currentValue || !StateContext._currentValue.user) {
		return (
			<Box>
				<h1>About Sneknet</h1>
				<p>
					Sneknet is the live component of our API, handling websocket
					connections and tokens.
				</p>
				<p>Sign in to see your tokens!</p>
			</Box>
		);
	}

	return (
		<>
			<Head>
				<title>Sneknet - The Snakeroom</title>
			</Head>
			<PageTitle>Sneknet</PageTitle>
			<Content>
				<h2>Tokens</h2>
				<p>
					Ask an admin for the full token if you&apos;ve misplaced
					yours.
				</p>
				<TokenList>
					<thead>
						<tr>
							<th>Name</th>
							<th>Token</th>
							<th>Whitelisted Address</th>
						</tr>
					</thead>
					<tbody>
						{tokens.map((token) => (
							<Token key={token.name} token={token} />
						))}
					</tbody>
				</TokenList>
			</Content>
		</>
	);
};

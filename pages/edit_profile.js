import Head from "next/head";
import { StateContext } from "../lib/state";
import { Box, PageTitle } from "../lib/common-style";

export default () => (
	<>
		<Head>
			<title>Edit Profile - Snakeroom</title>
		</Head>
		<StateContext.Consumer>
			{(userState) =>
				userState.user ? (
					<Box>
						<PageTitle>Edit Profile</PageTitle>
					</Box>
				) : (
					<Box>
						<PageTitle>Not signed in!</PageTitle>
					</Box>
				)
			}
		</StateContext.Consumer>
	</>
);

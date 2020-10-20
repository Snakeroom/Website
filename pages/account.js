import Head from "next/head";
import styled from "styled-components";
import { StateContext } from "../lib/state";
import Link from "../components/link";

const Container = styled.div`
	font-size: 1.5rem;
	text-align: right;
`;

const Title = styled.h1`
	font-size: 2rem;
`;

const Links = styled.div`
	margin-top: 4rem;
	font-size: 1rem;
`;

export default () => {
	return (
		<>
			<Head>
				<title>Account - Snakeroom</title>
			</Head>
			<StateContext.Consumer>
				{(userState) =>
					userState.user && (
						<Container>
							<Title>{userState.user.username}</Title>
							<p>pronouns: {userState.user.pronouns}</p>
							<Links>
								<Link href="/edit">Edit Profile</Link>
								<br />
								{userState.user.is_staff && (
									<Link href="https://api.snakeroom.org/admin">
										Admin Console
									</Link>
								)}
							</Links>
						</Container>
					)}
			</StateContext.Consumer>
		</>
	);
};

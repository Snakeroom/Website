import Head from "next/head";
import styled from "styled-components";
import StateContext from "../lib/state";
import Link from "../components/link";
import { PageTitle } from "../lib/common-style";
import { API_BASE } from "../lib/api";

const Container = styled.div`
	font-size: 1.5rem;
	text-align: right;
`;

const Links = styled.div`
	margin-top: 4rem;
	font-size: 1rem;
`;

export default function AccountPage() {
	return (
		<>
			<Head>
				<title>Account - The Snakeroom</title>
			</Head>
			<StateContext.Consumer>
				{(userState) =>
					userState.user ? (
						<Container>
							<PageTitle>{userState.user.username}</PageTitle>
							<p>pronouns: {userState.user.pronouns}</p>
							<Links>
								<Link href="/edit_profile">Edit Profile</Link>
								<br />
								{userState.user.is_staff && (
									<Link href={`${API_BASE}/admin`}>
										Admin Console
									</Link>
								)}
							</Links>
						</Container>
					) : (
						<Container>
							<PageTitle>Not signed in</PageTitle>
							<p>Log in with the account icon above.</p>
						</Container>
					)
				}
			</StateContext.Consumer>
		</>
	);
}

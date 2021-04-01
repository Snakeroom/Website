import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { API_BASE } from "../lib/api";
import { Box, PageTitle } from "../lib/common-style";
import { StateContext } from "../lib/state";

const StyledInput = styled.input`
	border: 1px solid ${(props) => props.theme.colors.primary};
	border-radius: 2px;
	margin: 10px 0;
	padding: 10px;
	display: block;
`;

const SubmitButton = styled(StyledInput)`
	cursor: pointer;
	transition: background-color 0.25s, color 0.25s;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.background};

	&:hover {
		background-color: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.primary};
	}
`;

export default ({ dispatch }) => {
	const router = useRouter();

	function submitForm(e) {
		e.preventDefault();

		const form = e.target;
		const { elements } = form;
		const payload = new URLSearchParams();

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			const { name } = element;

			if (element.type === "checkbox")
				payload.append(name, element.checked);
			else payload.append(name, element.value);
		}

		fetch(`${API_BASE}/identity/@me/profile/`, {
			method: "POST",
			body: payload,
			credentials: "include",
		})
			.then(() => {
				dispatch({ type: "mark" });
				return router.push("/account");
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<>
			<Head>
				<title>Edit Profile - Snakeroom</title>
			</Head>
			<StateContext.Consumer>
				{(userState) =>
					userState.user ? (
						<Box>
							<PageTitle>Edit Profile</PageTitle>
							<h2>{userState.user.username}</h2>
							<form method="post" onSubmit={submitForm}>
								<label htmlFor="pronouns">Pronouns:</label>
								<StyledInput
									type="text"
									name="pronouns"
									id="pronouns"
									placeholder={userState.user.pronouns}
								/>
								<SubmitButton
									type="submit"
									value="Update Profile"
								/>
							</form>
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
};

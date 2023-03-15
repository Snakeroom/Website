import Head from "next/head";
import { useRouter } from "next/router";
import { makeApiRequest } from "../lib/api";
import { Box, PageTitle } from "../lib/common-style";
import StateContext from "../lib/state";
import SubmitButton, { StyledInput } from "../components/submit-button";

export default function EditProfilePage({ dispatch }) {
	const router = useRouter();

	function submitForm(e) {
		e.preventDefault();

		const form = e.target;
		const { elements } = form;
		const payload = new URLSearchParams();

		for (let i = 0; i < elements.length; i += 1) {
			const element = elements[i];
			const { name } = element;

			if (element.type === "checkbox")
				payload.append(name, element.checked);
			else payload.append(name, element.value);
		}

		makeApiRequest("/identity/@me/profile/", {
			method: "POST",
			body: payload,
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
}

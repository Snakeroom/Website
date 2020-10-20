import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import HeaderButton from "./header-button";
import { StateContext } from "../lib/state";

const AccountDropdown = () => {
	return (
		<HeaderButton>
			<StateContext.Consumer>
				{(userState) =>
					userState.user ? (
						<NextLink href="/account" passHref>
							<a>
								<FontAwesomeIcon icon={faUser} />
							</a>
						</NextLink>
					) : (
						<a href="https://api.snakeroom.org/identity/reddit/login?return_to=https%3A%2F%2Fsnakeroom.org%2Faccount">
							<FontAwesomeIcon icon={faUser} />
						</a>
					)
				}
			</StateContext.Consumer>
		</HeaderButton>
	);
};

export default AccountDropdown;

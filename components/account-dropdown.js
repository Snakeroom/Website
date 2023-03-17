import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import HeaderButton from "./header-button";
import StateContext from "../lib/state";
import { API_BASE, WEBSITE_BASE } from "../lib/api";

function AccountDropdown() {
	return (
		<HeaderButton>
			<StateContext.Consumer>
				{(userState) =>
					userState.user ? (
						<NextLink href="/account" passHref>
							<FontAwesomeIcon icon={faUser} />
						</NextLink>
					) : (
						<a
							href={`${API_BASE}/identity/reddit/login?return_to=${encodeURIComponent(
								`${WEBSITE_BASE}/account`
							)}`}
						>
							<FontAwesomeIcon icon={faUser} />
						</a>
					)
				}
			</StateContext.Consumer>
		</HeaderButton>
	);
}

export default AccountDropdown;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import HeaderButton from "./header-button";

const AccountDropdown = () => {
	return (
		<HeaderButton>
			<a href="https://api.snakeroom.org/identity/reddit/login?return_to=https%3A%2F%2Fsnakeroom.org%2Fsneknet">
				<FontAwesomeIcon icon={faUser} />
			</a>
		</HeaderButton>
	);
};

export default AccountDropdown;

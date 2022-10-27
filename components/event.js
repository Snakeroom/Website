import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const EventContainer = styled.div`
	padding: 12px;
	font-size: 1.1em;

	background: ${(props) => props.theme.colors.backgroundMuted};
	border-radius: 8px;

	& > h3 {
		text-align: center;
		margin-bottom: 0.4em;
		font-size: 1.5em;
	}
`;

function Event({ icon, name, time, children }) {
	return (
		<EventContainer>
			<h3>
				<FontAwesomeIcon icon={icon} />
				{icon && (name || time) ? "\xA0" : ""}
				<span>
					{name}
					{name && time ? ` - ${time}` : ""}
				</span>
			</h3>
			<p>{children}</p>
		</EventContainer>
	);
}
export default Event;

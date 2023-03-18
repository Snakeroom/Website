import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Card from "./card";

const EventContainer = styled(Card)`
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

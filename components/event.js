import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Card } from "../lib/common-style";

const TimelineEntry = styled.div`
	margin: 10px 70px 10px auto;
	max-width: 900px;
	position: relative;

	&::before {
		content: " ";
		height: 0;
		position: absolute;
		top: 16px;
		width: 0;
		right: -10px;
		border: solid;
		border-width: 10px 0 10px 10px;
		border-color: transparent transparent transparent
			${(props) => props.theme.colors.backgroundMuted};
	}

	&::after {
		content: "";
		background: ${(props) => props.theme.colors.primary};
		width: 32px;
		height: 32px;
		border-radius: 16px;
		display: inline-block;
		position: absolute;
		top: 10px;
		right: -53px;
	}
`;

const EventCard = styled(Card)`
	display: inline-block;
`;

const EventTitle = styled.h3`
	text-align: right;
	margin-bottom: 0.4em;
	font-size: 1.5em;
`;

const BigTime = styled.h2`
	display: none;

	@media (min-width: 900px) {
		display: block;
		position: absolute;
		font-size: 8em;
		right: 910px;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		direction: rtl;
		color: ${(props) => props.theme.colors.primaryVeryMuted};
	}
`;

function Event({ icon, name, time, children }) {
	return (
		<TimelineEntry>
			<BigTime>{time}</BigTime>
			<EventCard>
				<EventTitle>
					<FontAwesomeIcon
						icon={icon}
						style={{ marginRight: "5px" }}
					/>
					{icon && (name || time) ? "\xA0" : ""}
					<span>
						{name}
						{name && time ? ` - ${time}` : ""}
					</span>
				</EventTitle>
				<p>{children}</p>
			</EventCard>
		</TimelineEntry>
	);
}
export default Event;

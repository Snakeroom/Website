import {
	faBirthdayCake,
	faCircleNotch,
	faMask,
	faRandom,
	faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import styled from "styled-components";
import Event from "../components/event";

const EventsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	& > * {
		flex: 0 1 calc(50% - 16px);
		margin: 8px;

		max-width: 35%;
	}

	@media (max-width: 800px) {
		flex-direction: column;

		& > * {
			flex-basis: 100%;
			max-width: unset;
		}
	}
`;

export default () => (
	<>
		<Head>
			<title>History - The Snakeroom</title>
		</Head>
		<EventsContainer>
			<Event icon={faMask} name="Imposter" time="April 2020">
				In this event, players received four messages by other players
				mixed with one generated by an AI and needed to determine which
				one was generated by the bot. The third iteration of the Sneknet
				collected results from each round to determine which of the five
				messages was generated by the bot. With enough data, the correct
				answer could automatically be selected.
			</Event>
			<Event icon={faVideo} name="RPAN" time="August 2019">
				RPAN is a streaming event with a cap on streamers and length.
				Before its initial launch week, the Snakeroom used a script that
				sniped slots and allowed users to broadcast from an OBS stream,
				bypassing the intended limitation of streaming from a mobile
				device and allowing Snakeroom members to create{" "}
				<strong>Place Live</strong> and{" "}
				<strong>RPAN Plays Pokémon</strong>. They were also able to
				stream prior to the event going live, although Reddit admins
				quickly shut this down.
			</Event>
			<Event icon={faRandom} name="Sequence" time="April 2019">
				During this event, players were able to upload and vote on GIFs,
				with the highest-upvoted GIFs selected to become part of the
				final video. The second iteration of the Sneknet locked in
				select GIFs using the power of Snakeroom participants, without
				chancing success on the whims of the wider Reddit community.
			</Event>
			<Event
				icon={faCircleNotch}
				name="Circle of Trust"
				time="April 2018"
			>
				During Circle of Trust, each player could create a single circle
				with a passcode of their choice. Players could share their
				passcode with others so that their circle could gain more
				members, but doing so allowed further spread of the passcode and
				the ability for players to betray the circle, ending it. The
				first iteration of the Sneknet made players join a circle from a
				command sent on the backend and added anyone running the
				extension before the circle could be betrayed.
			</Event>
			<Event
				icon={faBirthdayCake}
				name="Snakeroom Begins"
				time="March 2018"
			>
				In the leadup to Circle of Trust, the community founded the
				Snakeroom Alliance after discovering the subreddit
				r/snakeroomtest, with many believing it to be part of the event.
				Eventually, the name was shortened to simply The Snakeroom and a
				development team was formed to interact with the upcoming event.
			</Event>
		</EventsContainer>
	</>
);

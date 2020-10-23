import Head from "next/head";
import styled from "styled-components";

const Body = styled.p`
	font-size: 1.5rem;
	text-align: center;
`;

export default () => (
	<>
		<Head>
			<title>History - The Snakeroom</title>
		</Head>
		<Body>
			<strong>April 2020 - Imposter</strong>
			<br />
			Imposter is a Turing Test, the player receives four messages from
			Redditors and one from a bot and must determine which message is the
			bot. Sneknet V3 uses a database of previously collected answers to
			show the user if each answer is a human or a bot. It also
			automatically selects if the correct answer is known.
			<br />
			<br />
			<strong>August 2019 - RPAN</strong>
			<br />
			RPAN is a streaming event with a cap on streamers and length.
			Snakeroom creates scripts that snipe slots and allow the user to
			broadcast from an OBS stream, bypassing the intended limitation of
			streaming from a mobile device and allowing Snakeroom members to
			create &quot;Place In RPAN&quot; and &quot;RPAN Plays Pokemon&quot;.
			They also begin streaming before the event is live, though quickly
			shut down by Reddit admins.
			<br />
			<br />
			<strong>April 2019 - Sequence</strong>
			<br />
			During sequence, users upload and vote on gifs. The most upvoted
			gifs are strung together into a video. The Snakeroom creates Sneknet
			V2. The new extension accepts a link to a gif on the backend and
			then selects this GIF for all users running the extension, locking
			in GIF choices without chancing success on the whims of Reddit.
			<br />
			<br />
			<strong>April 2018 - Circle of Trust</strong>
			<br />
			In Circle of Trust, users create a circle. Each circle has a
			passcode, a user not in the circle can use the passcode to join or
			betray. Joining enlarges the circle, while betraying ends it. The
			Snakeroom creates the first Sneknet, a browser extension to automate
			the event. The extension automatically joins a circle from a command
			sent on the backend and adds anyone running the extension before it
			can be betrayed.
			<br />
			<br />
			<strong>March 2018 - Snakeroom Genesis</strong>
			<br />A group founds The Snakeroom Alliance after Reddit discovers
			r/snakeroomtest and many believe it to be part of the 2018 Reddit
			Fools’ event. The Snakeroom Alliance is shortened to The Snakeroom
			and a development team forms to interact with the upcoming event.
		</Body>
	</>
);

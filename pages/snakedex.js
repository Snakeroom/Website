import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeSnakedexRequest, SNAKEDEX_BASE } from "../lib/api";
import { Box, Card } from "../lib/common-style";
import { StyledInput } from "../components/submit-button";

function getSnakedexDescription(data) {
	if (data === null) {
		return "Loading the Snakedex...";
	}

	if (data.length === 1) {
		return "There is currently 1 snake in the Snakedex.";
	}

	return `There are currently ${data.length} snakes in the Snakedex.`;
}

function getSnakeName(snake) {
	if (
		"names" in snake &&
		Array.isArray(snake.names) &&
		typeof snake.names[0] === "string"
	) {
		return snake.names[0];
	}
	if ("name" in snake && typeof snake.name === "string") {
		return snake.name;
	}
	return null;
}

function getSnakeHeader(snake) {
	const name = getSnakeName(snake);
	if (name && snake.snakeNumber) {
		return `${name} — #${snake.snakeNumber}`;
	}
	if (name) {
		return name;
	}
	if (snake.snakeNumber) {
		return `#${snake.snakeNumber}`;
	}

	return null;
}

function getSnakeImage(snake) {
	if (
		"images" in snake &&
		typeof snake.images === "object" &&
		snake.images !== null
	) {
		return snake.images.full || snake.images["128x"] || null;
	}
	if ("image" in snake && typeof snake.image === "string") {
		return snake.image;
	}

	return null;
}

function isMatchingString(string, filter) {
	if (typeof string !== "string") return false;
	return string.toLowerCase().includes(filter);
}

function filterSnakes(snakes, originalFilter) {
	const filter = originalFilter.trim().toLowerCase();
	if (filter === "") return snakes;

	return snakes.filter((snake) => {
		if (
			isMatchingString(snake.name, filter) ||
			isMatchingString(snake.description, filter)
		) {
			return true;
		}

		if (Array.isArray(snake.names)) {
			if (snake.names.some((name) => isMatchingString(name, filter))) {
				return true;
			}
		}

		return false;
	});
}

const SnakeImageContainer = styled.div`
	background: radial-gradient(
		${(props) => props.theme.colors.cardImageBackgroundGradient},
		transparent
	);

	@media not all and (max-width: 600px) {
		padding: 12px;
		margin: -12px;
	}

	@media (max-width: 600px) {
		display: flex;
		justify-content: center;

		align-self: center;
		width: 100%;
	}
`;

const SnakeImage = styled.img`
	width: 96px;
	min-height: 96px;
	image-rendering: ${(props) => props.pixelated && "pixelated"};
`;

const SnakeCard = styled(Card)`
	display: flex;
	gap: 24px;

	@media (max-width: 600px) {
		padding: 0;
		flex-direction: column;
		gap: 0;

		& > * {
			padding: 12px;
		}
	}
`;

const SnakesContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 12px;
`;

function SnakedexSnake({ snake }) {
	const image = getSnakeImage(snake);

	return (
		<SnakeCard>
			{image && (
				<SnakeImageContainer>
					<SnakeImage
						src={`${SNAKEDEX_BASE}/${image}`}
						pixelated={snake.pixelated}
						alt={
							snake.snakeNumber
								? `Snake #${snake.snakeNumber}`
								: "Snake"
						}
					/>
				</SnakeImageContainer>
			)}
			<div>
				<h3>{getSnakeHeader(snake)}</h3>
				{snake.description && <p>{snake.description}</p>}
			</div>
		</SnakeCard>
	);
}

function SnakedexSnakes({ snakes, filter }) {
	return (
		<SnakesContainer>
			{filterSnakes(snakes, filter).map((snake) => {
				return <SnakedexSnake snake={snake} key={snake.id} />;
			})}
		</SnakesContainer>
	);
}

export default function SnakedexPage() {
	const router = useRouter();

	const [data, setData] = useState(null);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		if (router.query.q !== undefined) {
			setFilter(router.query.q);
		}
	}, [router.query.q]);

	useEffect(() => {
		makeSnakedexRequest(`/listing/all.json`)
			.then((res) => res.json())
			.then((fetched) => {
				if (fetched) {
					setData(fetched);
				}
			});
	}, []);

	return (
		<>
			<Head>
				<title>Snakedex - The Snakeroom</title>
			</Head>
			<Box>
				<h1>Snakedex</h1>
				<p>{getSnakedexDescription(data)}</p>
			</Box>
			<br />
			<StyledInput
				type="text"
				placeholder="Filter..."
				value={filter}
				onChange={(event) => setFilter(event.target.value)}
			/>
			{data !== null && (
				<SnakedexSnakes snakes={data.snakes} filter={filter} />
			)}
		</>
	);
}
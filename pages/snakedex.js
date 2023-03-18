import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { makeSnakedexRequest, SNAKEDEX_BASE } from "../lib/api";
import { Box } from "../lib/common-style";
import Card from "../components/card";
import { StyledInput } from "../components/submit-button";
import useFilter from "../lib/hooks/useFilter";
import { isMatchingString, filterArray } from "../lib/filter";

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

const SnakesContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 12px;
`;

function SnakedexSnake({ snake }) {
	const image = getSnakeImage(snake);

	return (
		<Card
			src={`${SNAKEDEX_BASE}/${image}`}
			pixelated={snake.pixelated}
			alt={snake.snakeNumber ? `Snake #${snake.snakeNumber}` : "Snake"}
		>
			<h3>{getSnakeHeader(snake)}</h3>
			{snake.description && <p>{snake.description}</p>}
		</Card>
	);
}

function SnakedexSnakes({ snakes, filter: originalFilter }) {
	const filteredSnakes = filterArray(
		snakes,
		originalFilter,
		(snake, filter) => {
			if (
				isMatchingString(snake.name, filter) ||
				isMatchingString(snake.description, filter)
			) {
				return true;
			}

			if (Array.isArray(snake.names)) {
				if (
					snake.names.some((name) => isMatchingString(name, filter))
				) {
					return true;
				}
			}

			return false;
		}
	);

	return (
		<SnakesContainer>
			{filteredSnakes.map((snake) => {
				return <SnakedexSnake snake={snake} key={snake.id} />;
			})}
		</SnakesContainer>
	);
}

export default function SnakedexPage() {
	const [data, setData] = useState(null);
	const [filter, setFilter] = useFilter();

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

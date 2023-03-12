import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Blurb, Hero } from "../lib/common-style";
import { makeSnakedexRequest, SNAKEDEX_BASE } from "../lib/api";
import { SnakeImage } from "./snakedex";

const BackgroundSnake = styled.div`
	position: absolute;
	bottom: 0;
	left: 5%;
	filter: saturate(0) opacity(0.05);
`;

const LazySnakeImage = styled(SnakeImage)`
	width: 500px;
	height: auto;
	animation: fade-in linear 0.5s;

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
`;

function randomOf(snakes) {
	return snakes[Math.floor(Math.random() * snakes.length)];
}

export default function IndexPage() {
	const [snakedex, setSnakedex] = useState(null);

	useEffect(() => {
		makeSnakedexRequest(`/listing/all.json`)
			.then((res) => res.json())
			.then((fetched) => {
				if (fetched) {
					setSnakedex(fetched);
				}
			});
	}, []);

	const snake = snakedex == null ? null : randomOf(snakedex.snakes);

	return (
		<>
			<Head>
				<title>Home - The Snakeroom</title>
			</Head>
			<Hero>
				<Blurb>
					<strong>The Snakeroom</strong> is an organization dedicated
					to solving and discussing <strong>Reddit&apos;s</strong>{" "}
					yearly <strong>April Fools events</strong> and official
					Reddit-run <strong>ARGs</strong> — both before and while
					they happen.
				</Blurb>
			</Hero>
			<BackgroundSnake>
				{snake && (
					<LazySnakeImage
						src={`${SNAKEDEX_BASE}/${snake.images["256x"]}`}
						pixelated={snake.pixelated}
						alt={
							snake.snakeNumber
								? `Snake #${snake.snakeNumber}`
								: "Snake"
						}
						title={snake.name}
					/>
				)}
			</BackgroundSnake>
		</>
	);
}

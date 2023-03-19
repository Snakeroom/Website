import styled from "styled-components";

const CardImageContainer = styled.div`
	background: radial-gradient(
		${(props) => props.theme.colors.cardImageBackgroundGradient},
		transparent
	);

	@media not all and (max-width: 600px) {
		padding: 12px;
		margin: -12px;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	@media (max-width: 600px) {
		display: flex;
		justify-content: center;

		align-self: center;
		width: 100%;
	}
`;

export const CardImage = styled.img`
	display: block;
	width: 96px;
	image-rendering: ${(props) => props.pixelated && "pixelated"};
`;

const CardContainer = styled.div`
	padding: 12px;
	font-size: 1.1em;

	background: ${(props) => props.theme.colors.backgroundMuted};
	border-radius: 8px;

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

function Card({ src, pixelated, alt, children }) {
	return (
		<CardContainer>
			{src && (
				<CardImageContainer>
					<CardImage src={src} pixelated={pixelated} alt={alt} />
				</CardImageContainer>
			)}
			<div>{children}</div>
		</CardContainer>
	);
}

export default Card;

import styled from "styled-components";

const ThumbnailImage = styled.img`
	display: block;
	margin-bottom: 10px;

	width: 100%;
	height: 300px;
	object-fit: contain;

	image-rendering: pixelated;
`;

export default ThumbnailImage;

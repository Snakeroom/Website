import styled from "styled-components";

export const Hero = styled.div``;

export const Blurb = styled.p`
	font-size: 3.5rem;
	margin-left: auto;
	margin-right: auto;
	max-width: 60rem;
	text-align: center;
`;

export const PageTitle = styled.h2`
	font-size: 2rem;
	text-align: right;
`;

export const Box = styled.div`
	margin-left: auto;
	max-width: 28rem;
	text-align: right;
`;

export const Card = styled.div`
	padding: 12px;
	font-size: 1.1em;

	background: ${(props) => props.theme.colors.backgroundMuted};
	border-radius: 8px;
`;

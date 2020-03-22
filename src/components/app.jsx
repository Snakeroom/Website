import React from "react";
import styled from "styled-components";

import SocialContainer from "./social-container.jsx";

import socials from "../socials.js";

class AppUnstyled extends React.Component {
	render() {
		return <div className={this.props.className}>
			<h1>
				Snakeroom
			</h1>
			<p>
				The Snakeroom is an organization dedicated to solving
				and discussing Reddit's yearly April Fools events and
				official Reddit-run ARGs — both before and while they
				happen. 
			</p>
			<SocialContainer socials={socials} />
		</div>;
	}
}

const App = styled(AppUnstyled)`
	width: calc(100% - 64px);
	height: calc(100% - 64px);

	padding: 32px;
	padding-top: 96px;

	font-family: sans-serif;
	color: #ddd;

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	& > *:not(:last-child) {
		padding-bottom: 24px;
	}

	h1, h2, h3, h4, h5, h6, p {
		width: 75%;
		margin: 0;
	}

	h1 {
		font-size: 3em;
	}

	p {
		font-size: 1.5em;
	}
`;
export default App;
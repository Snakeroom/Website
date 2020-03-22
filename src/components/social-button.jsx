import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

class SocialButtonUnstyled extends React.Component {
	render() {
		return <a href={this.props.to} className={this.props.className}>
			<div title={this.props.children} style={{
				backgroundColor: this.props.themeColor
			}}>
				<Icon icon={this.props.icon} fixedWidth />
			</div>
		</a>;
	}
}

const SocialButton = styled(SocialButtonUnstyled)`
	text-decoration: unset;
	color: white;
	display: block;
	user-select: none;

	& > div {
		width: 75px;
		height: 75px;

		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 8px;

		font-size: 50px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
export default SocialButton;
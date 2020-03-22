import React from "react";
import styled from "styled-components";

import SocialButton from "./social-button.jsx";

class SocialContainerUnstyled extends React.Component {
	render() {
		return <div className={this.props.className}>
			{this.props.socials.map(social => {
				return <SocialButton key={social.key} icon={social.icon} to={social.to} themeColor={social.themeColor}>
					{social.name}
				</SocialButton>;
			})}
		</div>;
	}
}

const SocialContainer = styled(SocialContainerUnstyled)`
	display: flex;

	& > *:not(:last-child) {
		padding-right: 12px;
	}
`;
export default SocialContainer;
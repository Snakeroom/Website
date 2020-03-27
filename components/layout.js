import styled from "styled-components";
import Logo from "../public/logo.svg";

const HeaderContainer = styled.header`
	display: flex;
`;

const HeaderLogo = styled(Logo)`
	width: 4rem;
`;

const Header = () => (
	<HeaderContainer>
		<HeaderLogo />
	</HeaderContainer>
);

const FooterContainer = styled.footer`
	display: flex;
`;

const Footer = () => <FooterContainer>Footer</FooterContainer>;

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const PageContainer = styled.main`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 10px;
`;

const Layout = ({ children }) => (
	<LayoutContainer>
		<Header />
		<PageContainer>{children}</PageContainer>
		<Footer />
	</LayoutContainer>
);

export default Layout;

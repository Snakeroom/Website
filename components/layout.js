import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "../public/logo.svg";
import Link from "./link";
import DiscordNag from "./discord-nag";
import ThemeSwitcher from "./theme-switcher";

const HeaderContainer = styled.header`
	align-items: center;
	display: flex;
	padding: 1rem;

	@media (max-width: 600px) {
		flex-direction: column;
	}
`;

const HeaderLink = styled(Link)`
	align-items: center;
	color: ${(props) => props.theme.colors.primary};

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
	}
`;

const HeaderLogo = styled(Logo)`
	margin-right: 1rem;
	width: 3rem;
`;

const HeaderTitle = styled.h1``;

const HeaderNav = styled.nav`
	display: flex;
	margin-left: auto;

	ul {
		display: flex;
		list-style: none;
	}

	li {
		margin-left: 1rem;
	}

	@media (max-width: 600px) {
		flex-direction: column;
		margin-left: 0;
		margin-top: 1rem;
	}
`;

const HeaderNavLink = ({ children, ...props }) => {
	const router = useRouter();
	return (
		<Link active={router.pathname === props.href} {...props}>
			{children}
		</Link>
	);
};

const Header = () => (
	<HeaderContainer>
		<HeaderLink href="/">
			<HeaderLogo />
			<HeaderTitle>The Snakeroom</HeaderTitle>
		</HeaderLink>
		<HeaderNav>
			<ul>
				<li>
					<HeaderNavLink href="/">Home</HeaderNavLink>
				</li>
				<li>
					<HeaderNavLink href="/history">History</HeaderNavLink>
				</li>
				<li>
					<HeaderNavLink href="/history">Sneknet</HeaderNavLink>
				</li>
				<li>
					<ThemeSwitcher />
				</li>
			</ul>
		</HeaderNav>
	</HeaderContainer>
);

const FooterContainer = styled.footer`
	color: ${(props) => props.theme.colors.muted};
	display: flex;
	padding: 1rem;
`;

const Footer = () => (
	<FooterContainer>
		<p>
			&copy; 2020{" "}
			<Link href="https://github.com/Snakeroom/Website/blob/master/LICENSE">
				snakeroom.org contributors
			</Link>
		</p>
		<DiscordNag />
	</FooterContainer>
);

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const PageContainer = styled.main`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 1rem;
`;

const Layout = ({ children }) => (
	<LayoutContainer>
		<Header />
		<PageContainer>{children}</PageContainer>
		<Footer />
	</LayoutContainer>
);

export default Layout;

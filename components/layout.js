import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "./logo";
import Link from "./link";
import DiscordNag from "./discord-nag";
import ThemeSwitcher from "./theme-switcher";
import AccountDropdown from "./account-dropdown";

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

	li:last-child > *:not(:last-child) {
		margin-right: 0.7rem;
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
			<HeaderTitle>Snakeroom</HeaderTitle>
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
					<HeaderNavLink href="/projects">Projects</HeaderNavLink>
				</li>
				<li>
					<HeaderNavLink href="/sneknet">Sneknet</HeaderNavLink>
				</li>
				<li>
					<ThemeSwitcher />
					<AccountDropdown />
				</li>
			</ul>
		</HeaderNav>
	</HeaderContainer>
);

const FooterLogo = styled(Logo)`
	filter: grayscale();
	margin-right: 1rem;
	opacity: 0.5;
	width: 2rem;
`;

const FooterContainer = styled.footer`
	align-items: center;
	background: ${(props) => props.theme.colors.backgroundMuted};
	color: ${(props) => props.theme.colors.primaryMuted};
	display: flex;
	min-height: 5rem;
	padding: 1rem;
`;

const FooterContent = styled.div`
	margin-left: auto;
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const FooterCredit = styled.p`
	margin-right: 1rem;
`;

const FooterLinks = styled.p``;

const Footer = () => (
	<FooterContainer>
		<FooterLogo />
		<FooterContent>
			<FooterCredit>
				&copy; 2020{" "}
				<Link href="https://github.com/Snakeroom/Website/blob/master/LICENSE">
					snakeroom.org contributors
				</Link>
			</FooterCredit>
			<FooterLinks>
				<Link href="https://discord.gg/CNahEjU" title="discord.gg/CNahEjU">Discord</Link> —{" "}
				<Link href="https://github.com/Snakeroom" title="@Snakeroom">GitHub</Link> —{" "}
				<Link href="https://reddit.com/r/snakeroomalliance" title="r/snakeroomalliance">Reddit</Link>
			</FooterLinks>
		</FooterContent>
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
	padding: 1rem 2rem;
	position: relative;
`;

const Layout = ({ children }) => (
	<LayoutContainer>
		<Header />
		<PageContainer>
			{children}
			<DiscordNag />
		</PageContainer>
		<Footer />
	</LayoutContainer>
);

export default Layout;

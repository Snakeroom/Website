import logoSvg from "../public/logo.svg";

const Logo = ({ className }) => (
	<img className={className} src={logoSvg} alt="a drawing of a green snake" />
);

export default Logo;

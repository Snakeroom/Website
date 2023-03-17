import logoSvg from "../public/logo.svg";

function Logo({ className }) {
	return (
		<img
			className={className}
			src={logoSvg}
			alt="a drawing of a green snake"
		/>
	);
}

export default Logo;

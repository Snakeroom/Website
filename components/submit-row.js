import styled from "styled-components";
import { useCallback, useState } from "react";
import SubmitButton from "./submit-button";

const SubmitRowBox = styled.div`
	display: flex;
	gap: 12px;

	flex-flow: row-reverse;
	text-align: right;
`;

const SubmitRowNag = styled.div`
	margin: 10px 0;
	padding: 9px;

	animation: fade-in linear 0.2s;

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	background-color: ${(props) => props.theme.colors.danger};
	color: #121212;
	border-radius: 8px;
`;

export default function SubmitRow({ name, onClick, disabled }) {
	const [error, setError] = useState(null);

	const callback = useCallback(async (event) => {
		try {
			await onClick(event);
			setError(null);
		} catch (err) {
			setError(err.message);

			// eslint-disable-next-line no-console
			console.error(err);
		}
	});

	return (
		<SubmitRowBox>
			<SubmitButton
				type="button"
				value={name}
				onClick={callback}
				disabled={disabled}
			/>
			{error === null ? null : <SubmitRowNag>{error}</SubmitRowNag>}
		</SubmitRowBox>
	);
}

import styled from "styled-components";
import { API_BASE } from "../lib/api";
import Card from "./card";
import ProjectPreview from "./project-preview";
import { InlineStyledInput } from "./submit-button";
import Link from "./link";

const ProjectPanelContainer = styled.div`
	margin: 0 auto;
	width: 100%;

	@media (min-width: 1200px) {
		max-width: 1200px;
	}

	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const InputBlock = styled.p`
	margin-top: 10px;
`;

const InputNote = styled.span`
	color: ${(props) => props.theme.colors.primaryMuted};
	font-size: 0.8rem;
`;

function isNonEmptyArray(array) {
	return Array.isArray(array) && array.length > 0;
}

function DivisionCoordinates({ division }) {
	const [x, y] = division.origin;
	const [width, height] = division.dimensions;

	if (width !== null && height !== null) {
		const maxX = Math.max(0, x + width - 1);
		const maxY = Math.max(0, y + height - 1);

		return (
			<>
				<InputBlock>
					Coordinates: ({x}, {y}) <InputNote>(top left)</InputNote> to
					({maxX}, {maxY}) <InputNote>(bottom right)</InputNote>
				</InputBlock>
				<InputBlock>
					Dimensions: {width}×{height}
				</InputBlock>
			</>
		);
	}

	return (
		<InputBlock>
			Offset: ({x}, {y}) <InputNote>(top left)</InputNote>
		</InputBlock>
	);
}

function DivisionCard({ project, division }) {
	const [width, height] = division.dimensions;

	const imageUrl =
		width !== null && height !== null
			? `${API_BASE}/y22/projects/${project.uuid}/divisions/${division.uuid}/bitmap`
			: null;

	return (
		<Card src={imageUrl} pixelated>
			<h4>{division.name}</h4>
			<DivisionCoordinates division={division} />
			<InputBlock>
				<label>
					Enabled:{" "}
					<InlineStyledInput
						type="checkbox"
						defaultChecked={division.enabled}
						disabled
					/>{" "}
					<InputNote>
						(disable divisions to stop directing users to contribute
						to them)
					</InputNote>
				</label>
			</InputBlock>
			<InputBlock>
				<label>
					Priority: {division.priority}{" "}
					<InputNote>(a higher number receives priority)</InputNote>
				</label>
			</InputBlock>
			{imageUrl !== null && project.can_edit ? (
				<InputBlock>
					<Link href={`${imageUrl}?download=1`}>
						Download Division Image
					</Link>
				</InputBlock>
			) : null}
		</Card>
	);
}

export default function ProjectPanel({ project }) {
	return (
		<ProjectPanelContainer>
			<ProjectPreview project={project} />
			{isNonEmptyArray(project.divisions) ? (
				<>
					<h3>Divisions</h3>
					{project.divisions.map((division) => (
						<DivisionCard
							key={division.uuid}
							project={project}
							division={division}
						/>
					))}
				</>
			) : null}
		</ProjectPanelContainer>
	);
}

import styled from "styled-components";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DivisionsRow from "./divisions-row";
import MembersRow from "./members-row";
import ProjectPreview from "./project-preview";
import SaveChangesRow from "./save-changes-row";

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

function isDirty(project, initialProject, divisionUploads) {
	// If a division image will be uploaded, then there are modifications
	if (Object.keys(divisionUploads).length > 0) {
		return true;
	}

	// If any division has changed, then there are modifications
	return project.divisions.some((division) => {
		const initialDivision = initialProject.divisions.find(
			(d) => d.uuid === division.uuid
		);

		// Newly added division
		if (initialDivision === undefined) return true;

		// Division with changed values
		if (division.name !== initialDivision.name) return true;
		if (division.priority !== initialDivision.priority) return true;
		if (division.enabled !== initialDivision.enabled) return true;

		if (division.origin[0] !== initialDivision.origin[0]) return true;
		if (division.origin[1] !== initialDivision.origin[1]) return true;

		return false;
	});
}

export default function ProjectPanel({ initialProject }) {
	const [project, setProject] = useState(initialProject);
	const [divisionUploads, setDivisionUploads] = useState({});

	const dirty = isDirty(project, initialProject, divisionUploads);

	const updateDivision = useCallback(
		(division) => {
			setProject({
				...project,
				divisions: project.divisions.map((d) => {
					return d.uuid === division.uuid ? division : d;
				}),
			});
		},
		[project]
	);

	const setDivisionUpload = useCallback(
		(division, file) => {
			setDivisionUploads({
				...divisionUploads,
				[division.uuid]: file,
			});
		},
		[divisionUploads]
	);

	const addDivision = useCallback(() => {
		setProject({
			...project,
			divisions: [
				...project.divisions,
				{
					create: true,
					uuid: uuidv4(),
					origin: [0, 0],
					dimensions: [null, null],
					priority: 0,
					enabled: true,
				},
			],
		});
	}, [project]);

	return (
		<ProjectPanelContainer>
			<ProjectPreview project={project} />
			<DivisionsRow
				project={project}
				divisionUploads={divisionUploads}
				updateDivision={updateDivision}
				setDivisionUpload={setDivisionUpload}
				addDivision={addDivision}
			/>
			<MembersRow members={project.members} />
			{project.can_edit ? (
				<SaveChangesRow
					project={project}
					divisionUploads={divisionUploads}
					dirty={dirty}
					setProject={setProject}
					setDivisionUploads={setDivisionUploads}
				/>
			) : null}
		</ProjectPanelContainer>
	);
}

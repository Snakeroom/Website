import styled from "styled-components";
import { useState, useCallback, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { API_BASE, makeApiRequest } from "../lib/api";
import Card from "./card";
import ProjectPreview from "./project-preview";
import SubmitButton, { InlineStyledInput } from "./submit-button";
import Link from "./link";
import SubmitRow from "./submit-row";

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

function getNumberOrDefault(value, defaultValue = 0) {
	return Number.isNaN(value) ? defaultValue : value;
}

function DivisionOrigin({ project, division, updateDivision }) {
	const [x, y] = division.origin;

	if (!project.can_edit) {
		return (
			<>
				({x}, {y})
			</>
		);
	}

	return (
		<>
			(
			<InlineStyledInput
				type="number"
				value={division.origin[0]}
				onChange={(event) => {
					updateDivision({
						...division,
						origin: [
							getNumberOrDefault(event.target.valueAsNumber),
							division.origin[1],
						],
					});
				}}
			/>
			,{" "}
			<InlineStyledInput
				type="number"
				value={division.origin[1]}
				onChange={(event) => {
					updateDivision({
						...division,
						origin: [
							division.origin[0],
							getNumberOrDefault(event.target.valueAsNumber),
						],
					});
				}}
			/>
			)
		</>
	);
}

function DivisionCoordinates({
	project,
	division,
	divisionUpload,
	updateDivision,
}) {
	const [x, y] = division.origin;
	const [width, height] = divisionUpload ? [null, null] : division.dimensions;

	if (width !== null && height !== null) {
		const maxX = Math.max(0, x + width - 1);
		const maxY = Math.max(0, y + height - 1);

		return (
			<>
				<InputBlock>
					Coordinates:{" "}
					<DivisionOrigin
						project={project}
						division={division}
						updateDivision={updateDivision}
					/>{" "}
					<InputNote>(top left)</InputNote> to ({maxX}, {maxY}){" "}
					<InputNote>(bottom right)</InputNote>
				</InputBlock>
				<InputBlock>
					Dimensions: {width}×{height}
				</InputBlock>
			</>
		);
	}

	return (
		<InputBlock>
			Offset:{" "}
			<DivisionOrigin
				project={project}
				division={division}
				updateDivision={updateDivision}
			/>{" "}
			<InputNote>(top left)</InputNote>
		</InputBlock>
	);
}

function ImageManagementBlock({
	imageUrl,
	division,
	divisionUpload,
	setDivisionUpload,
}) {
	const uploadRef = useRef(null);

	useEffect(() => {
		if (uploadRef.current) {
			const dataTransfer = new DataTransfer();

			if (divisionUpload) {
				dataTransfer.items.add(divisionUpload);
			}

			uploadRef.current.files = dataTransfer.files;
		}
	}, [divisionUpload]);

	return (
		<InputBlock>
			{imageUrl == null ? null : (
				<>
					<Link href={`${imageUrl}?download=1`}>
						Download Division Image
					</Link>{" "}
					•{" "}
				</>
			)}
			Replace Division Image:{" "}
			<InlineStyledInput
				type="file"
				accept="image/png,.png"
				ref={uploadRef}
				onChange={(event) => {
					const file = event.target.files?.[0];

					if (file) {
						setDivisionUpload(division, file);
					}
				}}
			/>
		</InputBlock>
	);
}

function DivisionCard({
	project,
	division,
	divisionUpload,
	updateDivision,
	setDivisionUpload,
}) {
	const [width, height] = division.dimensions;

	const imageUrl =
		width !== null && height !== null
			? `${API_BASE}/y22/projects/${project.uuid}/divisions/${division.uuid}/bitmap`
			: null;

	const [uploadUrl, setUploadUrl] = useState(null);

	useEffect(() => {
		if (!divisionUpload) {
			setUploadUrl(null);
			return;
		}

		const reader = new FileReader();

		reader.addEventListener(
			"load",
			(event) => {
				setUploadUrl(event.target.result);
			},
			{
				once: true,
			}
		);

		reader.readAsDataURL(divisionUpload);
	}, [divisionUpload]);

	return (
		<Card src={uploadUrl ?? imageUrl} pixelated>
			{project.can_edit ? (
				<InlineStyledInput
					value={division.name}
					onChange={(event) => {
						updateDivision({
							...division,
							name: event.target.value,
						});
					}}
				/>
			) : (
				<h4>{division.name}</h4>
			)}
			<DivisionCoordinates
				project={project}
				division={division}
				divisionUpload={divisionUpload}
				updateDivision={updateDivision}
			/>
			<InputBlock>
				<label>
					Enabled:{" "}
					<InlineStyledInput
						type="checkbox"
						checked={division.enabled}
						onChange={(event) => {
							updateDivision({
								...division,
								enabled: event.target.checked,
							});
						}}
						disabled={!project.can_edit}
					/>{" "}
					<InputNote>
						(disable divisions to stop directing users to contribute
						to them)
					</InputNote>
				</label>
			</InputBlock>
			<InputBlock>
				<label>
					Priority:{" "}
					<InlineStyledInput
						type="number"
						min={0}
						max={100}
						value={division.priority}
						onChange={(event) => {
							updateDivision({
								...division,
								priority: getNumberOrDefault(
									event.target.valueAsNumber
								),
							});
						}}
						disabled={!project.can_edit}
					/>{" "}
					<InputNote>(a higher number receives priority)</InputNote>
				</label>
			</InputBlock>
			{project.can_edit ? (
				<ImageManagementBlock
					imageUrl={imageUrl}
					division={division}
					divisionUpload={divisionUpload}
					setDivisionUpload={setDivisionUpload}
				/>
			) : null}
		</Card>
	);
}

function DivisionsRow({
	project,
	divisionUploads,
	updateDivision,
	setDivisionUpload,
	addDivision,
}) {
	if (!Array.isArray(project.divisions)) {
		return null;
	}

	return (
		<>
			<h3>Divisions</h3>
			{project.divisions.map((division) => (
				<DivisionCard
					key={division.uuid}
					project={project}
					division={division}
					divisionUpload={divisionUploads[division.uuid]}
					updateDivision={updateDivision}
					setDivisionUpload={setDivisionUpload}
				/>
			))}
			{project.can_edit ? (
				<div>
					<SubmitButton
						style={{ float: "right" }}
						type="button"
						value="Add Division"
						onClick={addDivision}
					/>
				</div>
			) : null}
		</>
	);
}

const roles = new Map()
	.set("owner", "Owner")
	.set("manager", "Manager")
	.set("user", "User");

function MemberCard({ member }) {
	return (
		<Card>
			<h4>{member.username}</h4>
			<InputBlock>Role: {roles.get(member.role)}</InputBlock>
		</Card>
	);
}

function SaveChangesRow({
	project,
	divisionUploads,
	dirty,
	setProject,
	setDivisionUploads,
}) {
	const onClick = useCallback(async () => {
		// Create new divisions
		const remappedUuids = new Map();

		// eslint-disable-next-line no-restricted-syntax
		for await (const division of project.divisions) {
			if (division.create) {
				const res = await makeApiRequest(
					`/y22/projects/${project.uuid}/create_division`,
					{
						method: "POST",
					}
				);

				const json = await res.json();

				if (res.ok) {
					remappedUuids.set(division.uuid, json.uuid);
				} else if (json.error) {
					throw new Error(json.error);
				}
			} else {
				remappedUuids.set(division.uuid, division.uuid);
			}
		}

		// Update division images
		const newUploads = { ...divisionUploads };

		// eslint-disable-next-line no-restricted-syntax
		for await (const [division, file] of Object.entries(divisionUploads)) {
			const uuid = remappedUuids.get(division);

			const res = await makeApiRequest(
				`/y22/projects/${project.uuid}/divisions/${uuid}/bitmap`,
				{
					method: "POST",
					body: file,
				}
			);

			if (res.ok) {
				delete newUploads[division];
			} else {
				const json = await res.json();

				if (json.error) {
					throw new Error(json.error);
				}
			}
		}

		// Update divisions
		const newDivisions = [];

		// eslint-disable-next-line no-restricted-syntax
		for await (const division of project.divisions) {
			const uuid = remappedUuids.get(division.uuid);

			const res = await makeApiRequest(
				`/y22/projects/${project.uuid}/divisions/${uuid}`,
				{
					method: "POST",
					body: JSON.stringify(division),
				}
			);

			const json = await res.json();

			if (res.ok) {
				newDivisions.push(json.division);
			} else if (json.error) {
				throw new Error(json.error);
			}
		}

		setProject({
			...project,
			divisions: newDivisions,
		});

		setDivisionUploads(newUploads);
	});

	return (
		<SubmitRow name="Save Changes" onClick={onClick} disabled={!dirty} />
	);
}

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
			{isNonEmptyArray(project.members) ? (
				<>
					<h3>Members</h3>
					{project.members.map((member) => (
						<MemberCard key={member.uid} member={member} />
					))}
				</>
			) : null}
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

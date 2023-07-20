import styled from "styled-components";
import { useState, useCallback } from "react";
import { API_BASE, makeApiRequest } from "../lib/api";
import Card from "./card";
import ProjectPreview from "./project-preview";
import { InlineStyledInput } from "./submit-button";
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

function DivisionCoordinates({ project, division, updateDivision }) {
	const [x, y] = division.origin;
	const [width, height] = division.dimensions;

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

function DivisionCard({ project, division, updateDivision }) {
	const [width, height] = division.dimensions;

	const imageUrl =
		width !== null && height !== null
			? `${API_BASE}/y22/projects/${project.uuid}/divisions/${division.uuid}/bitmap`
			: null;

	return (
		<Card src={imageUrl} pixelated>
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

export default function ProjectPanel({ initialProject }) {
	const [project, setProject] = useState(initialProject);

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
							updateDivision={updateDivision}
						/>
					))}
				</>
			) : null}
			{isNonEmptyArray(project.members) ? (
				<>
					<h3>Members</h3>
					{project.members.map((member) => (
						<MemberCard key={member.uid} member={member} />
					))}
				</>
			) : null}
			{project.can_edit ? (
				<SubmitRow
					name="Save Changes"
					onClick={() =>
						Promise.all(
							project.divisions.map((division) =>
								makeApiRequest(
									`/y22/projects/${project.uuid}/divisions/${division.uuid}`,
									{
										method: "POST",
										body: JSON.stringify(division),
									}
								)
									.then((res) => (res.ok ? {} : res.json()))
									.then((json) => {
										if (json.error) {
											throw new Error(json.error);
										}
									})
							)
						)
					}
				/>
			) : null}
		</ProjectPanelContainer>
	);
}

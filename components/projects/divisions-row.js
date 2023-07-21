import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { API_BASE } from "../../lib/api";
import Card from "../card";
import SubmitButton, { InlineStyledInput } from "../submit-button";
import Link from "../link";

export const InputBlock = styled.p`
	margin-top: 10px;
`;

const InputNote = styled.span`
	color: ${(props) => props.theme.colors.primaryMuted};
	font-size: 0.8rem;
`;

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

export default function DivisionsRow({
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

import { useCallback } from "react";
import { makeApiRequest } from "../../lib/api";
import SubmitRow from "../submit-row";

export default function SaveChangesRow({
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
			if (division.create && !division.delete) {
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
		for await (const [divisionUuid, file] of Object.entries(
			divisionUploads
		)) {
			const division = project.divisions.find(
				(d) => d.uuid === divisionUuid
			);

			if (!division.delete) {
				const uuid = remappedUuids.get(division.uuid);

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
		}

		// Delete divisions
		// eslint-disable-next-line no-restricted-syntax
		for await (const division of project.divisions) {
			if (!division.create && division.delete) {
				const res = await makeApiRequest(
					`/y22/projects/${project.uuid}/divisions/${division.uuid}`,
					{
						method: "DELETE",
					}
				);

				if (!res.ok) {
					const json = await res.json();

					if (json.error) {
						throw new Error(json.error);
					}
				}
			}
		}

		// Update divisions
		const newDivisions = [];

		// eslint-disable-next-line no-restricted-syntax
		for await (const division of project.divisions) {
			if (!division.delete) {
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

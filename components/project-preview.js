import { useState } from "react";
import { API_BASE, makeApiRequest } from "../lib/api";
import Card from "./card";
import Link from "./link";
import SubmitButton from "./submit-button";

class MembershipStatus {
	static Joining = new MembershipStatus("Joining...");

	static Joined = new MembershipStatus("Joined", "Leave");

	static Leaving = new MembershipStatus("Leaving...");

	static NotJoined = new MembershipStatus("Not Joined", "Join");

	static Unknown = new MembershipStatus("Unknown");

	constructor(text, button) {
		this.text = text;
		this.button = button ?? "Error";
	}
}

function ProjectName({ project, summary }) {
	const name = project.name || "Unnamed Project";

	if (summary) {
		return (
			<h3>
				<Link href={`/projects/${project.uuid}`}>{name}</Link>
			</h3>
		);
	}

	return <h3>{name}</h3>;
}

function ProjectPreview({ project, summary }) {
	const initialMembershipStatus = () => {
		if (typeof project.joined === "boolean") {
			return project.joined
				? MembershipStatus.Joined
				: MembershipStatus.NotJoined;
		}
		return MembershipStatus.Unknown;
	};

	const [membershipStatus, setMembershipStatus] = useState(
		initialMembershipStatus
	);

	const makeMembershipRequest = async (method) => {
		return makeApiRequest(`/y22/projects/${project.uuid}/membership`, {
			method,
		})
			.then((res) => res.json())
			.catch((err) => err);
	};

	const joinProject = async (event) => {
		event.preventDefault();

		setMembershipStatus(MembershipStatus.Joining);

		const joinResult = await makeMembershipRequest("PUT");

		if (joinResult.message === "OK") {
			setMembershipStatus(MembershipStatus.Joined);
		} else {
			setMembershipStatus(MembershipStatus.NotJoined);
		}
	};

	const leaveProject = async (event) => {
		event.preventDefault();

		setMembershipStatus(MembershipStatus.Leaving);

		const leaveResult = await makeMembershipRequest("DELETE");

		if (leaveResult.message === "OK") {
			setMembershipStatus(MembershipStatus.NotJoined);
		} else {
			setMembershipStatus(MembershipStatus.Joined);
		}
	};

	return (
		<Card
			src={
				"x" in project && "y" in project
					? `${API_BASE}/y22/projects/${project.uuid}/bitmap`
					: null
			}
		>
			<ProjectName project={project} summary={summary} />
			{typeof membershipStatus === "object" && (
				<p>Membership Status: {`${membershipStatus.text}`}</p>
			)}
			{typeof project.members === "number" && (
				<p>{project.members} members</p>
			)}
			{membershipStatus !== MembershipStatus.Unknown && (
				<form
					onSubmit={
						membershipStatus === MembershipStatus.Joined
							? leaveProject
							: joinProject
					}
				>
					<SubmitButton
						type="submit"
						value={membershipStatus.button}
					/>
				</form>
			)}
		</Card>
	);
}

export default ProjectPreview;

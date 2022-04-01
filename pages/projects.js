import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PageTitle } from "../lib/common-style";
import { makeApiRequest } from "../lib/api";
import SubmitButton from "../components/submit-button";

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;

const ProjectCard = styled.div`
	padding: 12px;
	font-size: 1.1em;

	background: ${(props) => props.theme.colors.backgroundMuted};
	border-radius: 8px;
`;

class MembershipStatus {
	static Joining = new MembershipStatus("Joining...");
	static Joined = new MembershipStatus("Joined");
	static Leaving = new MembershipStatus("Leaving...");
	static NotJoined = new MembershipStatus("Not Joined");
	static Unknown = new MembershipStatus("Unknown");

	constructor(text) {
		this.text = text;
	}
}

const ProjectPreview = ({ project }) => {
	let initialMembershipStatus = undefined;
	if (typeof project.joined === "boolean") {
		initialMembershipStatus = project.joined ? MembershipStatus.Joined : MembershipStatus.NotJoined;
	}
	const [membershipStatus, setMembershipStatus] = useState(initialMembershipStatus);

	const makeMembershipRequest = async (method) => {
		return makeApiRequest(`/y22/projects/${project.uuid}/membership`, {
			method: method,
		})
			.then((res) => res.json())
			.catch((err) => err);
	}

	const joinProject = async (event) => {
		event.preventDefault();

		setMembershipStatus(MembershipStatus.Joining);

		const joinResult = await makeMembershipRequest("PUT")

		if (joinResult.message === "OK") {
			setMembershipStatus(MembershipStatus.Joined);
		} else {
			setMembershipStatus(MembershipStatus.NotJoined);
		}
	};

	const leaveProject = async (event) => {
		event.preventDefault();

		setMembershipStatus(MembershipStatus.Leaving);

		const leaveResult = await makeMembershipRequest("DELETE")

		if (leaveResult.message === "OK") {
			setMembershipStatus(MembershipStatus.NotJoined);
		} else {
			setMembershipStatus(MembershipStatus.Joined);
		}
	}

	return (
		<ProjectCard>
			<h3>{project.name || "Unnamed Project"}</h3>
			{typeof membershipStatus === "object" && (
				<p>Membership Status: {`${membershipStatus.text}`}</p>
			)}
			{typeof project.members === "number" && (
				<p>{project.members} members</p>
			)}
			{typeof membershipStatus === "object" && (
				<form onSubmit={membershipStatus === MembershipStatus.Joined ? leaveProject : joinProject}>
					<SubmitButton
						type="submit"
						value={
							membershipStatus === MembershipStatus.Joined ? "Leave" :
							membershipStatus === MembershipStatus.NotJoined ? "Join" :
							"Error"
						}
					/>
				</form>
			)}
		</ProjectCard>
	);
};

export default () => {
	const [projects, setProjects] = useState(null);

	useEffect(() => {
		makeApiRequest("/y22/projects")
			.then((res) => res.json())
			.then((data) => {
				if (data.projects) {
					setProjects(data.projects);
				}
			});
	}, []);

	return (
		<>
			<Head>
				<title>Projects - The Snakeroom</title>
			</Head>
			<PageTitle>Projects</PageTitle>
			<br />
			{projects === null ? (
				<p>Loading projects</p>
			) : (
				<>
					<p>
						{projects.length === 1
							? "There is 1 project available."
							: `There are ${projects.length} projects available.`}
					</p>
					<ProjectsContainer>
						{projects.map((project) => {
							return (
								<ProjectPreview
									key={project.uuid}
									project={project}
								/>
							);
						})}
					</ProjectsContainer>
				</>
			)}
		</>
	);
};

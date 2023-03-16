import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box, PageTitle, Card } from "../lib/common-style";
import { makeApiRequest } from "../lib/api";
import SubmitButton, { StyledInput } from "../components/submit-button";
import useFilter from "../lib/hooks/useFilter";
import { isMatchingString, filterArray } from "../lib/filter";

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;

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

function ProjectPreview({ project }) {
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
		<Card>
			<h3>{project.name || "Unnamed Project"}</h3>
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

export default function ProjectsPage() {
	const [projects, setProjects] = useState(null);
	const [originalFilter, setFilter] = useFilter();

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
			<Box>
				<PageTitle>Projects</PageTitle>
				{projects === null ? (
					<p>Loading projects</p>
				) : (
					<p>
						{projects.length === 1
							? "There is 1 project available."
							: `There are ${projects.length} projects available.`}
					</p>
				)}
			</Box>
			<br />
			<StyledInput
				type="text"
				placeholder="Filter..."
				value={originalFilter}
				onChange={(event) => setFilter(event.target.value)}
			/>
			{projects !== null && (
				<ProjectsContainer>
					{filterArray(
						projects,
						originalFilter,
						(project, filter) => {
							return isMatchingString(project.name, filter);
						}
					).map((project) => {
						return (
							<ProjectPreview
								key={project.uuid}
								project={project}
							/>
						);
					})}
				</ProjectsContainer>
			)}
		</>
	);
}

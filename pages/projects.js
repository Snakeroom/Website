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

const ProjectPreview = ({ project }) => {
	const toggleProjectMembership = async (event) => {
		event.preventDefault();

		makeApiRequest(`/y22/projects/${project.uuid}/membership`, {
			method: project.joined ? "DELETE" : "PUT",
		});

		// This is gross and pain.
		Router.reload(window.location.pathname);
	};

	return (
		<ProjectCard>
			<h3>{project.name || "Unnamed Project"}</h3>
			<p>Project Joined: &apos;{`${project.joined}`}&apos;</p>
			{typeof project.members === "number" && (
				<p>{project.members} members</p>
			)}
			{typeof project.joined === "boolean" && (
				<form onSubmit={toggleProjectMembership}>
					<SubmitButton
						type="submit"
						value={project.joined ? "Leave" : "Join"}
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

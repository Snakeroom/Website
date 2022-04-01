import Head from "next/head";
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
	return (
		<ProjectCard>
			<h3>{project.name || "Unnamed Project"}</h3>
			{typeof project.members === "number" && (
				<p>{project.members} members</p>
			)}
			{typeof project.joined === "boolean" && (
				<SubmitButton
					type="submit"
					value={project.joined ? "Leave" : "Join"}
					disabled
				/>
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

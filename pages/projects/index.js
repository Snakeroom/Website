import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PageTitle } from "../../lib/common-style";
import { makeApiRequest } from "../../lib/api";
import ProjectPreview from "../../components/project-preview";

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;

export default function ProjectsPage() {
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
									summary
								/>
							);
						})}
					</ProjectsContainer>
				</>
			)}
		</>
	);
}

import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box, PageTitle } from "../../lib/common-style";
import { makeApiRequest } from "../../lib/api";
import ProjectPreview from "../../components/project-preview";
import { StyledInput } from "../../components/submit-button";
import useFilter from "../../lib/hooks/useFilter";
import { isMatchingString, filterArray } from "../../lib/filter";

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;

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
				<StyledInput
					style={{ float: "right" }}
					type="text"
					placeholder="Filter..."
					value={originalFilter}
					onChange={(event) => setFilter(event.target.value)}
				/>
			</Box>
			<br />
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
								summary
							/>
						);
					})}
				</ProjectsContainer>
			)}
		</>
	);
}

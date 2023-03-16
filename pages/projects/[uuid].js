import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageTitle } from "../../lib/common-style";
import { makeApiRequest } from "../../lib/api";
import ProjectPreview from "../../components/project-preview";
import NotFoundPage from "../404";

export default function ProjectPage() {
	const [project, setProject] = useState(null);
	const [error, setError] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const { uuid } = router.query;

			makeApiRequest("/y22/projects")
				.then((res) => res.json())
				.then((data) => {
					if (data.projects) {
						const foundProject = data.projects.find((p) => {
							return p.uuid === uuid;
						});

						if (foundProject) {
							setProject(foundProject);
							return;
						}
					}

					setError(true);
				})
				.catch((err) => {
					console.error(err);
					setError(true);
				});
		}
	}, [router.isReady]);

	if (error) {
		return NotFoundPage();
	}

	const title = project?.name ? `${project.name} Project` : "Projects";

	return (
		<>
			<Head>
				<title>{title} - The Snakeroom</title>
			</Head>
			<PageTitle>Projects</PageTitle>
			<br />
			{project ? <ProjectPreview project={project} /> : <p>Loading...</p>}
		</>
	);
}

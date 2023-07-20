import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageTitle } from "../../lib/common-style";
import { makeApiRequest } from "../../lib/api";
import ProjectPanel from "../../components/project-panel";
import NotFoundPage from "../404";

export default function ProjectPage() {
	const [project, setProject] = useState(null);
	const [error, setError] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const { uuid } = router.query;

			makeApiRequest(`/y22/projects/${uuid}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.project) {
						setProject(data.project);
						return;
					}

					setError(true);
				})
				.catch((err) => {
					// eslint-disable-next-line no-console
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
			{project ? <ProjectPanel project={project} /> : <p>Loading...</p>}
		</>
	);
}

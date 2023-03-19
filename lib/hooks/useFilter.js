import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useFilter = () => {
	const router = useRouter();

	const [filter, setFilter] = useState("");

	useEffect(() => {
		if (router.query.q !== undefined) {
			setFilter(router.query.q);
		}
	}, [router.query.q]);

	return [filter, setFilter];
};

export default useFilter;

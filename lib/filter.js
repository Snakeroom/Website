export const isMatchingString = (string, filter) => {
	if (typeof string !== "string") return false;
	return string.toLowerCase().includes(filter);
};

export const filterArray = (array, originalFilter, predicate) => {
	const filter = originalFilter.trim().toLowerCase();
	if (filter === "") return array;

	return array.filter((element) => {
		return predicate(element, filter);
	});
};

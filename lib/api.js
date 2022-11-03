export const API_BASE = "https://api.snakeroom.org";
export const SNAKEDEX_BASE = "https://snakeroom.github.io/Snakedex";

export const makeApiRequest = (path, fetchParams) => {
	return fetch(API_BASE + path, {
		credentials: "include",
		...fetchParams,
	});
};

export const makeSnakedexRequest = (path, fetchParams) => {
	return fetch(SNAKEDEX_BASE + path, fetchParams);
};

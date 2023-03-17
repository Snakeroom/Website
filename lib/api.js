export const WEBSITE_BASE = process.env.NEXT_PUBLIC_WEBSITE_BASE;
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const SNAKEDEX_BASE = process.env.NEXT_PUBLIC_SNAKEDEX_BASE;

export const makeApiRequest = (path, fetchParams) => {
	return fetch(API_BASE + path, {
		credentials: "include",
		...fetchParams,
	});
};

export const makeSnakedexRequest = (path, fetchParams) => {
	return fetch(SNAKEDEX_BASE + path, fetchParams);
};

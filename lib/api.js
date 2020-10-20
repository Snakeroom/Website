export const API_BASE = "https://api.snakeroom.org";

export const makeApiRequest = (path) => {
	return fetch(API_BASE + path, {
		credentials: "include",
	});
};

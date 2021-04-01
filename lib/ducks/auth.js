const initialState = {
	user: null,
	outdated: true,
};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case "restore":
			return {
				...state,
				user: action.user,
				outdated: false,
			};
		case "mark":
			return {
				...state,
				outdated: true,
			}
		default:
			return state;
	}
}

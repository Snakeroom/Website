const initialState = {
	user: null,
};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case "restore":
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
}

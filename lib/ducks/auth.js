const initialState = {
	user: null,
	outdated: true,
};

export default function authReducer(action, state = initialState) {
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
			};
		default:
			return state;
	}
}

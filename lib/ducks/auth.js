export const initialAuthState = {
	user: null,
	outdated: true,
};

/**
 * @type {React.Reducer<{ user?: any, outdated: boolean }, { type: string, user: any }>}
 */
export const authReducer = (state, action) => {
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
};

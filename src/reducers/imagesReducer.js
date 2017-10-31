import { ADD_PIXEL_DATA } from '../actions/types';

export default (state = {}, action) => {
	let target, pixels;

	switch (action.type) {
		case ADD_PIXEL_DATA:
			target = action.payload.target;
			pixels = action.payload.pixels;

			return {
				...state,
				[target]: { ...state[target], pixels: pixels }
			};
		default:
			return state;
	}
};

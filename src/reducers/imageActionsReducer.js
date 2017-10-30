import _ from 'lodash';
import {
	ADD_OPEN_IMAGE_BLOCK,
	ADD_WRITE_FILE_BLOCK,
	ADD_PROCESSING_BLOCK,
	REMOVE_PROCESSING_BLOCK,
	OPEN_IMAGE,
	WRITE_FILE,
	AREA_1,
	AREA_2
} from '../actions/types';

const initialState = {
	[AREA_1]: {
		[OPEN_IMAGE]: null,
		[WRITE_FILE]: null
	},
	[AREA_2]: {
		[OPEN_IMAGE]: null,
		[WRITE_FILE]: null
	}
};

export default (state = initialState, action) => {
	let target, type, id;

	switch (action.type) {
		case ADD_OPEN_IMAGE_BLOCK:
			target = action.payload.target;

			return {
				...state,
				[target]: { ...state[target], [OPEN_IMAGE]: {} }
			};
		case ADD_WRITE_FILE_BLOCK:
			target = action.payload.target;
			if (!state[target][OPEN_IMAGE]) return state;

			return {
				...state,
				[target]: { ...state[target], [WRITE_FILE]: {} }
			};
		case ADD_PROCESSING_BLOCK:
			target = action.payload.target;
			type = action.payload.type;
			id = _.size(state[target]) - 2;
			if (!state[target][OPEN_IMAGE]) return state;

			return {
				...state,
				[target]: { ...state[target], [id]: { type, id } }
			};
		case REMOVE_PROCESSING_BLOCK:
			const test = _.filter(state, con => con.id !== action.payload.id);
			return test;
		default:
			return state;
	}
};

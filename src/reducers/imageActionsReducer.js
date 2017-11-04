import _ from 'lodash';
import {
	ADD_OPEN_IMAGE_BLOCK,
	ADD_PROCESSING_BLOCK,
	REMOVE_PROCESSING_BLOCK,
	OPEN_IMAGE,
	AREA_1,
	AREA_2
} from '../actions/types';

const initialState = {
	[AREA_1]: {
		[OPEN_IMAGE]: null,
		id: 0
	},
	[AREA_2]: {
		[OPEN_IMAGE]: null,
		id: 0
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
		case ADD_PROCESSING_BLOCK:
			target = action.payload.target;
			type = action.payload.type;
			id = state[target].id++;
			if (!state[target][OPEN_IMAGE]) return state;

			return {
				...state,
				[target]: { ...state[target], [id]: { type, id } }
			};
		case REMOVE_PROCESSING_BLOCK:
			target = action.payload.target;

			const filterBlocks = _.filter(state[target], block => {
				debugger;
				return (
					block.id === undefined ||
					block.id !== Number(action.payload.id)
				);
			});
			return {
				...state,
				[target]: {
					...filterBlocks,
					[OPEN_IMAGE]: state[target][OPEN_IMAGE],
					id: state[target].id
				}
			};
		default:
			return state;
	}
};

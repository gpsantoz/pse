import _ from 'lodash';
import {
  ADD_OPEN_IMAGE_BLOCK,
  ADD_PROCESSING_BLOCK,
  REMOVE_PROCESSING_BLOCK,
  SET_CUSTOM_FILTER_STATE,
  OPEN_IMAGE,
  AREA_1,
  AREA_2,
} from '../actions/types';

const initialState = {
  [AREA_1]: {
    [OPEN_IMAGE]: null,
    id: 0,
  },
  [AREA_2]: {
    [OPEN_IMAGE]: null,
    id: 0,
  },
};

export default (state = initialState, action) => {
  let target, type, id;

  switch (action.type) {
    case ADD_OPEN_IMAGE_BLOCK:
      target = action.payload.target;

      return {
        ...state,
        [target]: { ...state[target], [OPEN_IMAGE]: {} },
      };
    case ADD_PROCESSING_BLOCK:
      target = action.payload.target;
      type = action.payload.type;
      id = state[target].id++;
      if (!state[target][OPEN_IMAGE]) {
        return state;
      }

      if (
        type === 'custom_filter' &&
        _.some(state[target], item => item.type === 'custom_filter')
      ) {
        return state;
      }

      return {
        ...state,
        [target]: { ...state[target], [id]: { type, id } },
      };
    case REMOVE_PROCESSING_BLOCK:
      target = action.payload.target;

      const filterBlocks = _.filter(state[target], block => {
        return block.id === undefined || block.id !== Number(action.payload.id);
      });

      return {
        ...state,
        [target]: {
          ...filterBlocks,
          [OPEN_IMAGE]: state[target][OPEN_IMAGE],
          id: state[target].id,
          customState:
            state[target][action.payload.id].type === 'custom_filter'
              ? {}
              : state[target].customState,
        },
      };
    case SET_CUSTOM_FILTER_STATE:
      target = action.payload.target;
      id = action.payload.id;
      const payload = action.payload.payload;
      return {
        ...state,
        [target]: {
          ...state[target],
          customState: payload,
        },
      };

    default:
      return state;
  }
};

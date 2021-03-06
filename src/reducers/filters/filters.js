import _ from 'lodash';
import {
  ADD_PROCESSING_BLOCK,
  UPDATE_PROCESSING_BLOCK,
  REMOVE_PROCESSING_BLOCK,
  REMOVE_ALL_PROCESSING_BLOCKS,
  SET_CUSTOM_FILTER_STATE,
  OPEN_IMAGE,
  AREA_1,
} from '../../constants/actionTypes';

const initialState = {
  [AREA_1]: {
  },
  blocks: [],
};

export default (state = initialState, action) => {
  let target, type, id, parameters, name
  switch (action.type) {
    case ADD_PROCESSING_BLOCK:
      target = action.payload.target;
      type = action.payload.type;
      name = action.payload.name
      id = state.blocks.length+1;
      parameters = action.payload.parameters ? action.payload.parameters : null

      //TODO: Permitir apenas 1 custom filter
      // if (
      //   type === 'custom_filter' &&
      //   _.some(state['fluxo_1'], item => item.type === 'custom_filter')
      // ) {
      //   return state;
      // }

      if (!state.blocks.includes(type)) {
        return {
          ...state,
          [target]: { ...state[target], [id]: { type, id, parameters, name } },
          // [target]: [ ...state[target], { type, id, parameters } ],
          blocks: [...state.blocks, { type, id, parameters, name }],
        };
      }

      return {
        ...state,
        [target]: { ...state[target], [id]: { type, id, parameters } },
      };

    case UPDATE_PROCESSING_BLOCK:
    target = action.payload.target;
    const filterID = action.payload.id;
    let parameters = action.payload.parameters ? action.payload.parameters : null
    return {
      ...state,
      [target]: { ...state[target], [filterID]: { ...state[target][filterID], parameters: parameters } },
      blocks: Object.assign([],state.blocks.map(
        (block,index) => (block.id == filterID) ? {...block,parameters} : block))
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
          blocks: [...filterBlocks.map(block => block.type)],
          id: state[target].id,
          customState:
            state[target][action.payload.id].type === 'custom_filter'
              ? {}
              : state[target].customState,
        },
      };

    case REMOVE_ALL_PROCESSING_BLOCKS:
      return {
        ...state, [AREA_1]: {
          id: 0,
        },
        blocks: []
      }

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

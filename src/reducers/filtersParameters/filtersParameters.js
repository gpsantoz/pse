import { ADD_FILTER_PARAMETER } from '../../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FILTER_PARAMETER:
      const { filterID, parameters } = action.payload
      //target = action.payload.target;
      //pixels = action.payload.pixels;

      return {
        ...state,
        [filterID]: { ...state[filterID], parameters: parameters },
      };
    default:
      return state;
  }
};

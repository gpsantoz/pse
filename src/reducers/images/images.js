import { ADD_PIXEL_DATA } from '../../constants/actionTypes';
import { PROCESS_IMAGE } from '../../constants/actionTypes';

export default (state = {}, action) => {
  let target, pixels;
  switch (action.type) {
    case ADD_PIXEL_DATA:
      target = action.payload.target;
      pixels = action.payload.pixels;

      return {
        ...state,
        [target]: { ...state[target], pixels: pixels },
      };
    case PROCESS_IMAGE:
      return {
        ...state,
        [action.payload.filter.id]: { pixels: action.payload.pixels}
      };
    default:
      return state;
  }
};

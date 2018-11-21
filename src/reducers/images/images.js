import { ADD_PIXEL_DATA, PROCESS_IMAGE, SET_PROCESSING_STATUS } from '../../constants/actionTypes';

export default (state = {processing: false}, action) => {
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
    case SET_PROCESSING_STATUS:
      return {
        ...state, processing: action.payload.status
      };
    default:
      return state;
  }
};

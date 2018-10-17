import { ADD_PIXEL_DATA } from '../constants/actionTypes';

export default (state = {}, action) => {
  let target, pixels, originalPixels;
  switch (action.type) {
    case ADD_PIXEL_DATA:
      target = action.payload.target;
      pixels = action.payload.pixels;
      originalPixels = action.payload.originalPixels;

      return {
        ...state,
        [target]: { ...state[target], pixels: pixels, originalPixels: originalPixels },
      };
    default:
      return state;
  }
};

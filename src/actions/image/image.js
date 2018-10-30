import {
    ADD_PIXEL_DATA,
} from '../../constants/actionTypes'

export const addPixelData = (pixels, target) => {
    return { type: ADD_PIXEL_DATA, payload: { pixels, target} };
  };

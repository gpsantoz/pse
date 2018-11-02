import {
    ADD_PIXEL_DATA,
    PROCESS_IMAGE
} from '../../constants/actionTypes'

import { handleFilter } from '../../components/shared/handleFilter';

export const addPixelData = (pixels, target) => {
    return { type: ADD_PIXEL_DATA, payload: { pixels, target} };
  };

export const processImage = (filter, actualPixels) => {
  const filteredImage = new ImageData(actualPixels.width, actualPixels.height);
  filteredImage.data.set(actualPixels.data);
  var actualPixels = filteredImage
  handleFilter(filter.type, actualPixels);
  return { type: PROCESS_IMAGE, payload: { filter, pixels: actualPixels } };
};

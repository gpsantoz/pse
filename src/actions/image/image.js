import {
    ADD_PIXEL_DATA,
    PROCESS_IMAGE
} from '../../constants/actionTypes'

import { handleFilter } from '../../components/shared/handleFilter';
import { loading } from '../../actions'

export const addPixelData = (pixels, target) => {
    return { type: ADD_PIXEL_DATA, payload: { pixels, target} };
  };

export const processImage = (filter, pixels, dispatch) => {
    console.log('process image')
    console.log(filter)
    const filteredImage = new ImageData(pixels.width, pixels.height);
    filteredImage.data.set(pixels.data);
    var actualPixels = filteredImage
    processPixels(filter, actualPixels)
    dispatch(loading.removeLoading())
    return { type: PROCESS_IMAGE, payload: { filter, pixels: actualPixels } };
};

const processPixels = async (filter, pixels) => {
    return await handleFilter(filter, pixels);
}
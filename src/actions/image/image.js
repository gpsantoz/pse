import {
    ADD_PIXEL_DATA,
    PROCESS_IMAGE,
    SET_PROCESSING_STATUS
} from '../../constants/actionTypes'

import { handleFilter } from '../../components/shared/handleFilter';
import { loading } from '../../actions'
import { removeLoading } from '../loading/loading';

export const addPixelData = (pixels, target) => {
    return { type: ADD_PIXEL_DATA, payload: { pixels, target} };
  };

export const setProcessingStatus = (status) => {
return { type: SET_PROCESSING_STATUS, payload: { status} };
};

export const processImage = (filter, pixels, dispatch) => {
    const filteredImage = new ImageData(pixels.width, pixels.height);
    filteredImage.data.set(pixels.data);
    var actualPixels = filteredImage
    var result = processPixels(filter, actualPixels)
    const resultImage = new ImageData(result.width, result.height);
    resultImage.data.set(result.data)
    dispatch(setProcessingStatus(false))
    dispatch(removeLoading())
    return { type: PROCESS_IMAGE, payload: { filter, pixels: resultImage } };
};

const processPixels = (filter, pixels) => {
    return handleFilter(filter, pixels);
}
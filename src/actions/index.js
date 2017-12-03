import {
	ADD_OPEN_IMAGE_BLOCK,
	ADD_WRITE_FILE_BLOCK,
	ADD_PROCESSING_BLOCK,
	REMOVE_PROCESSING_BLOCK,
	SET_CUSTOM_FILTER_STATE,
	ADD_PIXEL_DATA
} from './types';

export const addOpenImageBlock = (type, target) => {
	return { type: ADD_OPEN_IMAGE_BLOCK, payload: { type, target } };
};
export const addWriteFileBlock = (type, target) => {
	return { type: ADD_WRITE_FILE_BLOCK, payload: { type, target } };
};
export const addProcessingBlock = (type, target) => {
	return { type: ADD_PROCESSING_BLOCK, payload: { type, target } };
};
export const removeProcessingBlock = (id, target) => {
	return { type: REMOVE_PROCESSING_BLOCK, payload: { id, target } };
};
export const setCustomFilterState = (id, target, payload) => {
	return {
		type: SET_CUSTOM_FILTER_STATE,
		payload: { id, target, payload }
	};
};

export const addPixelData = (pixels, target) => {
	return { type: ADD_PIXEL_DATA, payload: { pixels, target } };
};

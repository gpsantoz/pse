import {
	ADD_OPEN_IMAGE_BLOCK,
	ADD_WRITE_FILE_BLOCK,
	ADD_PROCESSING_BLOCK,
	REMOVE_PROCESSING_BLOCK
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
export const removeProcessingBlock = id => {
	return { type: REMOVE_PROCESSING_BLOCK, payload: { id } };
};

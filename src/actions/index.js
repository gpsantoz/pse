import { ADD_PROCESSING_BLOCK, REMOVE_PROCESSING_BLOCK } from './types';

export const addProcessingBlock = (type, target) => {
    return { type: ADD_PROCESSING_BLOCK, payload: { type, target } };
};
export const removeProcessingBlock = (id) => {
    return { type: REMOVE_PROCESSING_BLOCK, payload: { id } };
};
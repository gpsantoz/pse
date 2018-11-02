import {
    ADD_WRITE_FILE_BLOCK,
    ADD_PROCESSING_BLOCK,
    REMOVE_PROCESSING_BLOCK,
    REMOVE_ALL_PROCESSING_BLOCKS,
    SET_CUSTOM_FILTER_STATE,
    PROCESS_FILTER
  } from '../../constants/actionTypes';

  import { image, loading } from '../../actions'

  export const addWriteFileBlock = (type, target) => {
    return { type: ADD_WRITE_FILE_BLOCK, payload: { type, target } };
  };

  export const addProcessingBlock = (type, target, name, parameters) => {
    return { type: ADD_PROCESSING_BLOCK, payload: { type, target, name, parameters } };
  };

  export const removeProcessingBlock = (id, target) => {
    return { type: REMOVE_PROCESSING_BLOCK, payload: { id, target } };
  };

  export const setCustomFilterState = (id, target, payload) => {
    return {
      type: SET_CUSTOM_FILTER_STATE,
      payload: { id, target, payload },
    };
  };

  export const removeAllProcessingBlocks = (target) => {
    return { type: REMOVE_ALL_PROCESSING_BLOCKS, payload: { target } };
  };



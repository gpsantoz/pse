import { combineReducers } from 'redux';
import imageActionsReducer from './imageActionsReducer';
import imagesReducer from './imagesReducer';

export default combineReducers({
  imageActions: imageActionsReducer,
  images: imagesReducer,
});

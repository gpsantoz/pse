import { combineReducers } from 'redux';
import imageActionsReducer from './imageActionsReducer';
import imagesReducer from './imagesReducer';
import loading from './loading/loading';

export default combineReducers({
  imageActions: imageActionsReducer,
  images: imagesReducer,
  loading: loading
});

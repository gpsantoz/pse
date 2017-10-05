import { combineReducers } from 'redux';
import imageActionsReducer from './imageActionsReducer';

export default combineReducers({
	imageActions: imageActionsReducer
});

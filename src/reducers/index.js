import { combineReducers } from 'redux';
import imageAreasReducer from './imageAreasReducer'

export default combineReducers({
    imageAreas: imageAreasReducer
});

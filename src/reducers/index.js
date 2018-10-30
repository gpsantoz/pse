import { combineReducers } from 'redux';
import loading from './loading/loading';
import images from './images/images';
import filtersParameters from './filtersParameters/filtersParameters';
import filters from './filters/filters';

export default combineReducers({
  filters: filters,
  images: images,
  loading: loading,
  parameters: filtersParameters
});

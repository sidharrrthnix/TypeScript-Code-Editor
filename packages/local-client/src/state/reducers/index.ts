import { combineReducers } from 'redux';
import cellReducer from './cellReducer';
import BundleReducer from './bundleReducer';
const reducers = combineReducers({
  cells: cellReducer,
  bundles: BundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

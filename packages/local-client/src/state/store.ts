import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { presistMiddleware } from './middleware/persist-middleware';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(presistMiddleware, thunk));

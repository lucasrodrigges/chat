import combineReducers from 'react-combine-reducers';

import { chatReducer, chatInitialState } from './chatReducer';

const [reducers, initialState] = combineReducers({
  broad: [chatReducer, chatInitialState],
});

export { reducers, initialState };

import combineReducers from 'react-combine-reducers';

import { searchReducer, searchInitialState } from './searchReducer';
import { messagesReducer, messagesInitialState } from './messagesReducer';

const [reducers, initialState] = combineReducers({
  search: [searchReducer, searchInitialState],
  messages: [messagesReducer, messagesInitialState],
});

export { reducers, initialState };

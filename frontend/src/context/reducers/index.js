import combineReducers from 'react-combine-reducers';
import { userReducer, userInitialState } from './userReducer';

const [reducers, initialState] = combineReducers({
  user: [userReducer, userInitialState],
});

export { reducers, initialState };

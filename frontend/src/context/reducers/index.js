import combineReducers from 'react-combine-reducers';
import { userReducer, userInitialState } from './userReducer';
import { postsReducer, postsInitialState } from './postsReducer';

const [reducers, initialState] = combineReducers({
  user: [userReducer, userInitialState],
  posts: [postsReducer, postsInitialState],
});

export { reducers, initialState };

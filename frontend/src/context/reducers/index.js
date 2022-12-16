import combineReducers from 'react-combine-reducers';
import { userReducer, userInitialState } from './userReducer';
import { postsReducer, postsInitialState } from './postsReducer';
import { sidebarReducer, sidebarInitialState } from './sidebarReducer';

const [reducers, initialState] = combineReducers({
  users: [userReducer, userInitialState],
  posts: [postsReducer, postsInitialState],
  sidebar: [sidebarReducer, sidebarInitialState],
});

export { reducers, initialState };

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import postsSlice from './postsSlice';

const reducer = combineReducers({
  posts: postsSlice,
  todos: todoSlice,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: true })]
});

export default store;
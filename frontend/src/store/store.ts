import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './loggedin';

const store = configureStore({
  reducer: {
    status: loggedInReducer,
  },
});

export default store;

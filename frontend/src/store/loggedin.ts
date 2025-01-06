import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

export const loggedIn = createSlice({
  name: 'loggedin',
  initialState,
  reducers: {
    setLogin: (state) => {
      state.loggedIn = true;
    },
  },
});

export const { setLogin } = loggedIn.actions;
export default loggedIn.reducer;

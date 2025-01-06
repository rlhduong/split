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
    setLogout: (state) => {
      state.loggedIn = false;
    }
  },
});

export const { setLogin, setLogout } = loggedIn.actions;
export default loggedIn.reducer;

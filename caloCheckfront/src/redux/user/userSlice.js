import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state) => {
        state.error = null;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
      },
    
      signInFailure: (state, action) => {
        state.error = action.payload;
      },

      signoutSuccess: (state) => {
        state.currentUser = null;
        state.error = null;
        state.loading = false;
      },
      updateUserNameSuccess: (state, action) => {
        state.currentUser.userName = action.payload;
        state.error = null;
    },
    },
  });
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signoutSuccess,
    updateUserNameSuccess,
  } = userSlice.actions;
  
  export default userSlice.reducer;
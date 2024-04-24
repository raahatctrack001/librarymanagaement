import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
        state.currentUser = null,
        state.error = null,
        state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload,
      state.error = null,
      state.loading = false
    },
    signInFailure: (state, action) => {
      state.currentUser = null,
      state.error = action.payload,
      state.loading = false
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null,
      state.loading = null
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { 
      signInStart, 
      signInFailure, 
      signInSuccess, 
      signOutSuccess,
      updateUserStart,
      updateUserFailure,
      updateUserSuccess,
      deleteUserStart,
      deleteUserFailure,
      deleteUserSuccess, 
} = userSlice.actions

export default userSlice.reducer
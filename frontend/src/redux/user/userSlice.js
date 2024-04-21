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
  },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInFailure, signInSuccess } = userSlice.actions

export default userSlice.reducer
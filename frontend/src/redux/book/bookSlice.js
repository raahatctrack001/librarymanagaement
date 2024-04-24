import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
  loading: false,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBookStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    addBookFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addBookSuccess: (state, action)=>{
        state.loading = false;
        state.error = null;
    }, 
    updateBookStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    updateBookFailure: (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },
    updateBookSuccess: (state, failure) => {
        state.loading = false;
        state.error = null;
    },
    deleteBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteBookSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { 
    addBookStart,
    addBookFailure,
    addBookSuccess,
    updateBookStart,
    updateBookFailure,
    updateBookSuccess,
    deleteBookStart,
    deleteBookFailure,
    deleteBookSuccess,
      
} = bookSlice.actions

export default bookSlice.reducer
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSuccessFormSubmitted: false,
};

export const successFormSlice = createSlice({
  name: 'successForm',
  initialState,
  reducers: {
    openSuccessPage: (state) => {
      state.isSuccessFormSubmitted = true;
    },
    closeSuccessPage: (state) => {
      state.isSuccessFormSubmitted = false;
    },
  },
});

export const successFormActions = successFormSlice.actions;
export const successFormReducer = successFormSlice.reducer;

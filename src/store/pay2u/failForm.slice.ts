/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFailFormSubmitted: false,
};

export const failFormSlice = createSlice({
  name: 'failForm',
  initialState,
  reducers: {
    openFailPage: (state) => {
      state.isFailFormSubmitted = true;
    },
    closeFailPage: (state) => {
      state.isFailFormSubmitted = false;
    },
  },
});

export const failFormActions = failFormSlice.actions;
export const failFormReducer = failFormSlice.reducer;

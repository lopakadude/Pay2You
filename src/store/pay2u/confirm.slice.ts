/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConfirmOpened: false,
  contentType: '',
};

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    openConfirm: (state) => {
      state.isConfirmOpened = true;
    },
    closeConfirm: (state) => {
      state.isConfirmOpened = false;
    },
    setModalContentType: (state, action) => {
      state.contentType = action.payload;
    },
  },
});

export const confirmActions = confirmSlice.actions;
export const confirmReducer = confirmSlice.reducer;

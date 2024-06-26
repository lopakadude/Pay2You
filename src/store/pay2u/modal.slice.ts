/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpened: false,
  contentType: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpened = true;
    },
    closeModal: (state) => {
      state.isModalOpened = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

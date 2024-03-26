/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopupOpened: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: state => {
      state.isPopupOpened = true;
    },
    closePopup: state => {
      state.isPopupOpened = false;
    },
  },
});

export const popupActions = popupSlice.actions;
export const popupReducer = popupSlice.reducer;

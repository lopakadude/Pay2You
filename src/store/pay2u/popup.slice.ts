/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopupOpened: false,
  contentType: '',
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
    setModalContentType: (state, action) => {
      state.contentType = action.payload;
    },
  },
});

export const popupActions = popupSlice.actions;
export const popupReducer = popupSlice.reducer;

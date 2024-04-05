/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProlongation: false,
};

export const prolongationSlice = createSlice({
  name: 'prolongation',
  initialState,
  reducers: {
    prolongationActive: (state) => {
      state.isProlongation = true;
    },
    prolongationCancel: (state) => {
      state.isProlongation = false;
    },
  },
});

export const prolongationActions = prolongationSlice.actions;
export const prolongationReducer = prolongationSlice.reducer;

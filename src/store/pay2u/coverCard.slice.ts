/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface CoverIdState {
  currentCoverId: number;
}

const initialState: CoverIdState = {
  currentCoverId: 0
  ,
};

export const currentCoverIdSlice = createSlice({
  name: 'currentCoverId',
  initialState,
  reducers: {
    setCurrentCoverId: (state, action) => {
      state.currentCoverId = action.payload;
    },
  },
});

export const currentCoverIdActions = currentCoverIdSlice.actions;
export const currentCoverIdReducer = currentCoverIdSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface CoversState {
  covers: MyCardType[];
}

const initialState: CoversState = {
  covers: [],
};

export const coversSlice = createSlice({
  name: 'covers',
  initialState,
  reducers: {
    setCovers: (state, action) => {
      state.covers = action.payload;
    },
  },
});

export const coversActions = coversSlice.actions;
export const coversReducer = coversSlice.reducer;

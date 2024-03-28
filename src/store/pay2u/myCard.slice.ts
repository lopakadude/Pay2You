/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface CardState {
  currentCard: MyCardType;
}

const initialState: CardState = {
  currentCard: {
    id: 0,
    name: '',
    end_date: '',
    price: 0,
    period: '',
    logo_link: '',
    categories: [],
    promocode: '',
    description: '',
    cashBack: 0,
    is_active: false,
  },
};

export const currentCardSlice = createSlice({
  name: 'currentCard',
  initialState,
  reducers: {
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
  },
});

export const currentCardActions = currentCardSlice.actions;
export const currentCardReducer = currentCardSlice.reducer;

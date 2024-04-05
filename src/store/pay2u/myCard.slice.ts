/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface CardState {
  currentCard: MyCardType;
}

const initialState: CardState = {
  currentCard: {
    id: 0,
    name: '',
    cover_name: '',
    cover: 0,
    end_date: '',
    price: 0,
    period: '',
    logo_link: '',
    categories: [],
    promocode: '',
    description: '',
    cashback_percent: 0,
    service_link: '',
    monthly_price: 0,
    annual_price: 0,
    semi_annual_price: 0,
    is_active: false,
    preview: '',
    autorenewal: false,
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

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface newSubState {
  newSub: MyCardType;
}

const initialState: newSubState = {
  newSub: {
    id: 0,
    name: '',
    cover_name: '',
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

export const newSubSlice = createSlice({
  name: 'newSub',
  initialState,
  reducers: {
    setNewSub: (state, action) => {
      state.newSub = action.payload;
    },
  },
});

export const newSubActions = newSubSlice.actions;
export const newSubReducer = newSubSlice.reducer;

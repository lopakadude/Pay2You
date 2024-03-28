/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  currentUser: UserType;
}

const initialState: UserState = {
  currentUser: {
    phone_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    account_balance: 0,
    cashback: 0,
    subscriptions: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

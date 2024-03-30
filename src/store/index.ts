import { configureStore } from '@reduxjs/toolkit';
import { api } from './pay2u/pay2u.api';
import { authReducer } from './pay2u/auth.slice';
import { popupReducer } from './pay2u/popup.slice';
import { modalReducer } from './pay2u/modal.slice';
import { confirmReducer } from './pay2u/confirm.slice';
import { userReducer } from './pay2u/user.slice';
import { currentCardReducer } from './pay2u/myCard.slice';
import { coversReducer } from './pay2u/covers.slice';
import { currentCoverIdReducer } from './pay2u/coverCard.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    popup: popupReducer,
    modal: modalReducer,
    confirm: confirmReducer,
    user: userReducer,
    currentCard: currentCardReducer,
    covers: coversReducer,
    currentCoverId: currentCoverIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

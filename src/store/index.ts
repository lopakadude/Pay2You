import { configureStore } from '@reduxjs/toolkit';
import { api } from './pay2u/pay2u.api';
import { authReducer } from './pay2u/auth.slice';
import { popupReducer } from './pay2u/popup.slice';
import { modalReducer } from './pay2u/modal.slice';
import { confirmReducer } from './pay2u/confirm.slice';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    popup: popupReducer,
    modal: modalReducer,
    confirm: confirmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

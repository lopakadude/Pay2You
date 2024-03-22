import { configureStore } from '@reduxjs/toolkit';
import { api } from './pay2u/pay2u.api';
import { authReducer } from './pay2u/auth.slice';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

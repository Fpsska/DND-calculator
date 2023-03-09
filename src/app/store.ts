import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import mainSlice from './slices/mainSlice';

// /. imports

export const store = configureStore({
  reducer: { mainSlice }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

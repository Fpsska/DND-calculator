import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import calculatorSlice from './slices/calculatorSlice';
import constructorSlice from './slices/constructorSlice';

// /. imports

export const store = configureStore({
  reducer: { calculatorSlice, constructorSlice }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

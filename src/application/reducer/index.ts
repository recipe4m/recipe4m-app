import auth, { AuthState } from './Auth';
import theme, { ThemeState } from './Theme';
import timer, { TimerState } from './Timer';
import timerCard, { TimerCardState } from './TimerCard';

import { combineReducers } from '@reduxjs/toolkit';
import { persistConfig } from './Persist';
import { persistReducer } from 'redux-persist';

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
  timer: TimerState;
  timerCard: TimerCardState;
}

export const rootReducer = combineReducers<RootState>({
  auth,
  theme,
  timer,
  timerCard,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

import auth, { AuthState } from './auth';
import theme, { ThemeState } from './theme';

import { combineReducers } from '@reduxjs/toolkit';
import { persistConfig } from './persist';
import { persistReducer } from 'redux-persist';

export interface StoreState {
  theme: ThemeState;
  auth: AuthState;
}

export const rootReducer = combineReducers<StoreState>({
  auth,
  theme,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

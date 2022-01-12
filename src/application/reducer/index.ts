import auth, { AuthState } from './Auth';
import theme, { ThemeState } from './Theme';

import { combineReducers } from '@reduxjs/toolkit';
import { persistConfig } from './Persist';
import { persistReducer } from 'redux-persist';

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
}

export const rootReducer = combineReducers<RootState>({
  auth,
  theme,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

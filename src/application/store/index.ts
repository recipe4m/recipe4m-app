import authReducer, { AuthState } from '../reducer/auth';
import themeReducer, { ThemeState } from '../reducer/theme';

import { configureStore } from '@reduxjs/toolkit';

export interface StoreState {
  theme: ThemeState;
  auth: AuthState;
}

export default configureStore<StoreState>({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

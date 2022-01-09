import themeReducer, { ThemeState } from '../reducer/theme';

import { configureStore } from '@reduxjs/toolkit';

export interface StoreState {
  theme: ThemeState;
}

export default configureStore<StoreState>({
  reducer: {
    theme: themeReducer,
  },
});

import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

export interface Tokens {
  refreshToken: string | null;
  accessToken: string | null;
}

export interface AuthState extends Tokens {
  isSignedIn: boolean;
}

export interface AuthReducer extends SliceCaseReducers<AuthState> {
  resetTokens: (state: AuthState) => void;
  setTokens: (state: AuthState, action: PayloadAction<Tokens>) => void;
}

export const authSlice = createSlice<AuthState, AuthReducer, 'auth'>({
  name: 'auth',
  initialState: {
    refreshToken: null,
    accessToken: null,
    isSignedIn: false,
  },
  reducers: {
    resetTokens(state) {
      state.refreshToken = null;
      state.accessToken = null;

      state.isSignedIn = false;
    },
    setTokens(state, action) {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;

      state.isSignedIn =
        state.refreshToken !== null && state.accessToken !== null;
    },
  },
});

export const { resetTokens, setTokens } = authSlice.actions;

export default authSlice.reducer;

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

export interface AuthReducer extends SliceCaseReducers<AuthState> {}

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
    setTokens(state, action: PayloadAction<AuthState>) {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;

      state.isSignedIn =
        state.refreshToken !== null && state.accessToken !== null;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;

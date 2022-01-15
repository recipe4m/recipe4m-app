import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface AuthState {
  isSignedIn: boolean;
  refreshToken: string | null;
  accessToken: string | null;
}

export interface AuthReducer extends SliceCaseReducers<AuthState> {
  signIn: (state: AuthState, action: PayloadAction<Tokens>) => void;
  signOut: (state: AuthState) => void;
}

export const authSlice = createSlice<AuthState, AuthReducer, 'auth'>({
  name: 'auth',
  initialState: {
    isSignedIn: false,
    refreshToken: null,
    accessToken: null,
  },
  reducers: {
    signIn(state, action) {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;

      state.isSignedIn = true;
    },
    signOut(state) {
      state.refreshToken = null;
      state.accessToken = null;

      state.isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

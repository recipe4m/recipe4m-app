import * as AuthReducer from '@reducer/Auth';

import React, { useCallback, useEffect } from 'react';

import { GOOGLE_SIGN_IN_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authUseCase from '@useCase/AuthUseCase';
import { useDispatch } from 'react-redux';

export default function useSignInWithGoogle() {
  const dispatch = useDispatch();

  const signIn = useCallback(async () => {
    try {
      const tokens = await authUseCase.signInWithGoogle();
      dispatch(AuthReducer.signIn(tokens));
    } catch (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async () => {
    try {
      const tokens = await authUseCase.signUpWithGoogle();
      dispatch(AuthReducer.signIn(tokens));
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_SIGN_IN_CLIENT_ID,
    });
  }, []);

  return { signIn };
}

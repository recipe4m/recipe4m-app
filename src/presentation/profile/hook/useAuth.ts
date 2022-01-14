import * as ApiAuth from '@remote/auth';
import * as ReducerAuth from '@reducer/Auth';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@reducer';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

export default function useAuth() {
  const { isSignedIn, refreshToken } = useSelector(
    ({ auth }: RootState) => auth,
  );

  const dispatch = useDispatch();

  const signOutMutation = useMutation(ApiAuth.apiPatchAuthSignOut);

  const _signOut = useCallback(async () => {
    try {
      await signOutMutation.mutateAsync({ refreshToken });
      dispatch(ReducerAuth.signOut());
    } catch (error) {
      throw error;
    }
  }, [refreshToken]);

  return {
    isSignedIn,
    signOut: _signOut,
  };
}

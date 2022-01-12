import React, { PropsWithChildren, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@reducer';
import { setTokens } from '@reducer/auth';

export interface AuthContextValue {}

export interface AuthProviderProps {}

export const AuthContext = createContext<AuthContextValue>({});

export function AuthProvider({
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const auth = useSelector(({ auth }: RootState) => auth);

  const dispatch = useDispatch();

  dispatch(
    setTokens({ refreshToken: 'refreshToken', accessToken: 'accessToken' }),
  );

  console.log(auth);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

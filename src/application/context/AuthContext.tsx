import React, { PropsWithChildren, createContext } from 'react';

import { RootState } from '@reducer';
import { useSelector } from 'react-redux';

export interface AuthContextValue {}

export interface AuthProviderProps {}

export const AuthContext = createContext<AuthContextValue>({});

export function AuthProvider({
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const refreshToken = useSelector(({ auth }: RootState) => auth.refreshToken);
  console.log(refreshToken);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

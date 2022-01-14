import { AppState, AppStateStatus } from 'react-native';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { signIn, signOut } from '@reducer/Auth';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@reducer';
import { apiPostAuthRefresh } from 'src/data/remote/auth';
import { axiosClient } from '@application/lib/AxiosClient';
import { parseJwt } from '@application/lib/JsonWebToken';

export interface AuthContextValue {}

export interface AuthProviderProps {}

export const AuthContext = createContext<AuthContextValue>({});

export function AuthProvider({
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const timeoutRef = useRef<number | null>(null);
  const { refreshToken, accessToken } = useSelector(
    ({ auth }: RootState) => auth,
  );
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
    if (!accessToken || !refreshToken) return;

    const { exp } = parseJwt(accessToken);
    const expiredAt = (exp - 5 * 60) * 1000; // 만료 5분 전
    const now = new Date().valueOf();

    if (now > expiredAt) {
      try {
        const res = await apiPostAuthRefresh({ refreshToken });

        dispatch(
          signIn({
            refreshToken: res.data.refreshToken,
            accessToken: res.data.accessToken,
          }),
        );
      } catch (error) {
        dispatch(signOut());
      }
    }
  }, [refreshToken, accessToken]);

  useEffect(() => {
    if (accessToken) {
      axiosClient.setBearerToken(accessToken);
    } else {
      axiosClient.resetBearerToken();
    }
  }, [accessToken]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (accessToken && refreshToken) {
      const { exp } = parseJwt(accessToken);
      const expiredAt = (exp - 1 * 60) * 1000; // 만료 1분 전
      const now = new Date().valueOf();

      timeoutRef.current = setTimeout(() => {
        refresh();
      }, expiredAt - now);
    }
  }, [refresh]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (appStateStatus: AppStateStatus) => {
        if (appStateStatus === 'active') refresh();
      },
    );

    return () => {
      subscription.remove();
    };
  }, [refresh]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

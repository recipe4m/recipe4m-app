import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React, { PropsWithChildren, useMemo } from 'react';

import useTheme from '@common/hook/useTheme';

interface NavigationProps {}

export default function Navigation({
  children,
}: PropsWithChildren<NavigationProps>) {
  const { theme, colors } = useTheme();

  const navigationTheme = useMemo(() => {
    return theme === 'light'
      ? {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.SYSTEM_BACKGROUND,
          },
        }
      : {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: colors.SYSTEM_BACKGROUND,
          },
        };
  }, [theme, colors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
}

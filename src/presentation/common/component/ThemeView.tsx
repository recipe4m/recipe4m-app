import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { StyleProp, View, ViewStyle, useColorScheme } from 'react-native';
import { setDarkTheme, setLightTheme } from '@reducer/Theme';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@reducer';

interface ThemeViewProps {}

export default function ThemeView({
  children,
}: PropsWithChildren<ThemeViewProps>) {
  const scheme = useColorScheme();
  const { theme, colors } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const style = useMemo<StyleProp<ViewStyle>>(
    () => ({
      flex: 1,
      backgroundColor: colors.SYSTEM_BACKGROUND,
    }),
    [colors],
  );

  useEffect(() => {
    if (scheme !== theme)
      dispatch(scheme === 'light' ? setLightTheme() : setDarkTheme());
  }, [dispatch, scheme, theme]);

  return <View style={style}>{children}</View>;
}

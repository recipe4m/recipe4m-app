import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface SubRegularProps extends TextProps {}

export default function SubRegular({
  children,
  style,
  ...props
}: SubRegularProps) {
  const { colors } = useTheme();

  const subRegularStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 12,
      color: colors.REGULAR,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[subRegularStyle, style]}>
      {children}
    </Text>
  );
}

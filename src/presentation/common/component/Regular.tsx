import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface RegularProps extends TextProps {}

export default function Regular({ children, style, ...props }: RegularProps) {
  const { colors } = useTheme();

  const regularStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 14,
      color: colors.REGULAR,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[regularStyle, style]}>
      {children}
    </Text>
  );
}

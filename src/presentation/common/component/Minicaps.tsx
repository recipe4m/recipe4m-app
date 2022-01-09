import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface MinicapsProps extends TextProps {}

export default function Minicaps({ children, style, ...props }: MinicapsProps) {
  const { colors } = useTheme();

  const minicapsStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 10,
      fontWeight: '700',
      color: colors.MINICAPS,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[minicapsStyle, style]}>
      {children}
    </Text>
  );
}

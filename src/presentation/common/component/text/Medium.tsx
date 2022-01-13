import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface MediumProps extends TextProps {}

export default function Medium({ children, style, ...props }: MediumProps) {
  const { colors } = useTheme();

  const mediumStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 14,
      fontWeight: '700',
      color: colors.MEDIUM,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[mediumStyle, style]}>
      {children}
    </Text>
  );
}

import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface HeadingProps extends TextProps {}

export default function Heading({ children, style, ...props }: HeadingProps) {
  const { colors } = useTheme();

  const headingStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.HEADING,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[headingStyle, style]}>
      {children}
    </Text>
  );
}

import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface SubHeadingProps extends TextProps {}

export default function SubHeading({
  children,
  style,
  ...props
}: SubHeadingProps) {
  const { colors } = useTheme();

  const subHeadingStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 16,
      fontWeight: '700',
      color: colors.SUB_HEADING,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[subHeadingStyle, style]}>
      {children}
    </Text>
  );
}

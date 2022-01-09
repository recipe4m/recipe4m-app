import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface TitleProps extends TextProps {}

export default function Title({ children, style, ...props }: TitleProps) {
  const { colors } = useTheme();

  const titleStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.TITLE,
    }),
    [colors],
  );

  return (
    <Text {...props} style={[titleStyle, style]}>
      {children}
    </Text>
  );
}

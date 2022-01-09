import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface TimerCardView extends ViewProps {}

export default function TimerCardView({
  children,
  style,
  ...props
}: PropsWithChildren<TimerCardView>) {
  const { colors } = useTheme();

  const timerCardViewStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      margin: 18,
      padding: 18,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.CARD_BORDER,
    }),
    [colors],
  );

  return (
    <View {...props} style={[timerCardViewStyle, style]}>
      {children}
    </View>
  );
}

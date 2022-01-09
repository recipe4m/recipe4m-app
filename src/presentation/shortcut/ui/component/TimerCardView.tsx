import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface TimerCardView extends ViewProps {}

export default function TimerCardView({
  children,
  style,
  ...props
}: PropsWithChildren<TimerCardView>) {
  const timerCardViewStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      margin: 18,
      borderRadius: 18,
      overflow: 'hidden',
    }),
    [],
  );

  return (
    <View {...props} style={[timerCardViewStyle, style]}>
      <LinearGradient colors={['#FAD7A1', '#E96D71']} style={{ padding: 18 }}>
        {children}
      </LinearGradient>
    </View>
  );
}

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';

import { Size } from '@style/Size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '@common/hook/useTheme';

interface FloatingTimerViewProps extends ViewProps {}

export default function FloatingTimerView({
  children,
}: FloatingTimerViewProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const translateX = useSharedValue<number>(-74);

  const floatingTimerViewStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      marginBottom: insets.bottom + 10,
      backgroundColor: colors.FLOATING_TIMER_BACKGROUND,
      borderColor: colors.FLOATING_TIMER_BORDER,
    }),
    [insets, colors],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, floatingTimerViewStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: Size.BOTTOM_TAB_BAR_HEIGHT,
    right: -64,
    height: 64,
    minWidth: 64,
    borderWidth: 2,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});

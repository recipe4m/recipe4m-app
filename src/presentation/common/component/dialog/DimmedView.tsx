import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet } from 'react-native';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { Animation } from '@style/Animation';
import { ColorPalette } from '@style/ColorPalette';

export type Visible = 'visible' | 'invisible' | 'disappearing';

export interface DimmedViewProps {
  visible: Visible;
  onPress: () => void;
  onInvisible: () => void;
}

export default function DimmedView({
  children,
  visible,
  onPress,
  onInvisible,
}: PropsWithChildren<DimmedViewProps>) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const opacity = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * 0.4,
  }));

  useEffect(() => {
    if (visible === 'visible') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      opacity.value = withDelay(
        100,
        withTiming(1, { duration: Animation.DIALOG_DURATION }),
      );
    } else if (visible === 'disappearing') {
      opacity.value = withTiming(0, { duration: Animation.DIALOG_DURATION });
      timeoutRef.current = setTimeout(() => {
        onInvisible();
      }, Animation.DIALOG_DURATION);
    }
  }, [onInvisible, opacity, visible]);

  if (visible === 'invisible') return null;

  return (
    <Pressable style={StyleSheet.absoluteFillObject} onPress={onPress}>
      <Animated.View style={[styles.dimmed, animatedStyle]} />
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dimmed: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ColorPalette.BLACK,
  },
});

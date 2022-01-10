import { ColorPalette } from '@style/ColorPalette';
import React, {
  PropsWithChildren,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface DimmedViewProps {
  visible: boolean;
  onInvisible: () => void;
}

export default function DimmedView({
  children,
  visible,
  onInvisible,
}: PropsWithChildren<DimmedViewProps>) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const opacity = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * 0.4,
  }));

  const handlePressClose = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 });
    timeoutRef.current = setTimeout(() => {
      onInvisible();
    }, 300);
  }, [onInvisible, opacity]);

  useEffect(() => {
    if (visible) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      opacity.value = withDelay(100, withTiming(1, { duration: 300 }));
    }
  }, [onInvisible, opacity, visible]);

  if (!visible) return null;

  return (
    <Pressable style={StyleSheet.absoluteFillObject} onPress={handlePressClose}>
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

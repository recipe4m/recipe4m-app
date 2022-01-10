import { ColorPalette } from '@style/ColorPalette';
import React, {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
} from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ForwardedRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface DimmedViewRef {
  open: () => void;
  close: () => void;
}

export interface DimmedViewProps {}

function DimmedView(
  { children }: PropsWithChildren<DimmedViewProps>,
  ref: ForwardedRef<DimmedViewRef>,
) {
  const [visible, setVisible] = useState<boolean>(false);
  const opacity = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value * 0.4,
  }));

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, [opacity]);

  useEffect(() => {
    if (visible) opacity.value = withTiming(1, { duration: 300 });
  }, [opacity, visible]);

  useEffect(() => {
    if ((ref as MutableRefObject<DimmedViewRef | null>)?.current === null) {
      (ref as MutableRefObject<DimmedViewRef>).current = {
        open,
        close,
      };
    }
  }, [close, open, ref]);

  if (!visible) return <></>;

  return (
    <Pressable style={StyleSheet.absoluteFillObject} onPress={close}>
      <Animated.View style={[styles.dimmed, animatedStyles]} />
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

export default forwardRef<DimmedViewRef, PropsWithChildren<DimmedViewProps>>(
  DimmedView,
);

import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import {
  StyleProp,
  ImageBackground,
  ViewStyle,
  StyleSheet,
  Pressable,
  PressableProps,
  ImageSourcePropType,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

interface TimerCardViewProps extends Omit<PressableProps, 'style'> {
  style: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TimerCardView(
  { children, source, style, ...props }: PropsWithChildren<TimerCardViewProps>,
  ref: ForwardedRef<View>,
) {
  return (
    <AnimatedPressable ref={ref} {...props} style={[styles.container, style]}>
      <ImageBackground style={StyleSheet.absoluteFillObject} source={source} />
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 18,
    padding: 18,
    borderRadius: 18,
    height: 220,
    overflow: 'hidden',
  },
});

export default forwardRef(TimerCardView);

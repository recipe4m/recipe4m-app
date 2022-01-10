import React, { PropsWithChildren, useMemo } from 'react';
import {
  StyleProp,
  ImageBackground,
  ViewStyle,
  ImageBackgroundProps,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface TimerCardView extends ImageBackgroundProps {}

export default function TimerCardView({
  children,
  style,
  ...props
}: PropsWithChildren<TimerCardView>) {
  const timerCardViewStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      margin: 18,
      padding: 18,
      borderRadius: 18,
      height: 220,
      overflow: 'hidden',
    }),
    [],
  );

  return (
    <ImageBackground {...props} style={[timerCardViewStyle, style]}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
        style={styles.background}
      />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
});

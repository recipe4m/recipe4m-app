import Animated, { interpolate, multiply } from 'react-native-reanimated';
import React, { useMemo } from 'react';
import Svg, { Circle } from 'react-native-svg';

import { ColorPalette } from '@style/ColorPalette';
import useTheme from '@common/hook/useTheme';

interface CircleProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircleProgressBar({
  progress,
  size = 48,
  strokeWidth = 4,
  strokeColor = ColorPalette.ORANGE_100,
}: CircleProgressBarProps) {
  const { colors } = useTheme();

  const { radius, circumference } = useMemo(() => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return { radius, circumference };
  }, [size, strokeWidth]);

  const alpha = interpolate(progress, [0, 1], [0, Math.PI * 2]);
  const strokeDashoffset = multiply(alpha, -radius);

  return (
    <Svg
      style={{ transform: [{ rotateZ: '270deg' }] }}
      width={size}
      height={size}>
      <Circle
        stroke={colors.PROGRESS_BAR_BACKGROUND}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
      />
      <AnimatedCircle
        stroke={strokeColor}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDashoffset={strokeDashoffset}
        strokeDasharray={`${circumference} ${circumference}`}
      />
    </Svg>
  );
}

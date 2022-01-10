/* eslint-disable @typescript-eslint/no-shadow */
import { ColorPalette } from '@style/ColorPalette';
import React, { useEffect, useMemo, useState } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import DialogView from './DialogView';
import { DefaultOptions } from './interface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

export interface TimerDialogOptions extends DefaultOptions {
  time: number;
}

interface TimerDialogProps {
  options: TimerDialogOptions;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function TimerDialog({ options }: TimerDialogProps) {
  const [time, setTime] = useState<number>(options.time);

  const size = useSharedValue<number>(30);

  const { h, m, s } = useMemo(() => {
    let remain = time / 1000;
    const h = Math.floor(remain / 3600);
    remain = remain % 3600;
    const m = `${Math.floor(remain / 60)}`.padStart(2, '0');
    const s = `${remain % 60}`.padStart(2, '0');
    return { h, m, s };
  }, [time]);

  useEffect(() => {
    setTimeout(() => {
      size.value = withTiming(100, { duration: 300 });
    }, 100);
  }, []);

  return (
    <DialogView layout={options.layout} source={options.source}>
      <Animated.View style={[styles.iconWrapper]}>
        <AnimatedIcon
          name="timer"
          size={size.value}
          color={ColorPalette.WHITE}
        />
      </Animated.View>
      <Animated.Text
        style={styles.timerWrapper}>{`${h}:${m}:${s}`}</Animated.Text>
    </DialogView>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'absolute',
    top: 18,
    left: 18,
  },
  timerWrapper: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
});

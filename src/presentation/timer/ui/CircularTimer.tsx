import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Animated from 'react-native-reanimated';
import CircularProgressBar from '@common/component/CircularProgressBar';
import Medium from '@common/component/text/Medium';
import { NotificationTimer } from '@model/NotificationTimer';
import { TimerEvent } from '@model/Timer';
import useTheme from '@common/hook/useTheme';

export default function CircularTimer({ timer }: { timer: NotificationTimer }) {
  const progress = useSharedValue<number>(1);
  const [count, setCount] = useState<number>(-1);
  const fontValue = useSharedValue<number>(0);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    color: colors.MEDIUM,
    fontSize: interpolate(fontValue.value, [0, 0.6, 1], [12, 19, 20]),
    opacity: interpolate(fontValue.value, [0, 0.6, 1], [0.7, 1, 0]),
  }));

  useEffect(() => {
    const handleRun = (e: TimerEvent) => {
      progress.value = withTiming(e.progress, { duration: 100 });

      if (e.remainTimeout < 5000) {
        const _count = Math.floor(e.remainTimeout / 1000) + 1;
        if (count !== _count) setCount(_count);
      }
    };
    timer.addEventListener('run', handleRun);
    return () => {
      timer.removeEventListener('run', handleRun);
    };
  }, [timer, count]);

  useEffect(() => {
    fontValue.value = 0;
    fontValue.value = withTiming(1, { duration: 1000 });
  }, [count]);

  return (
    <View style={styles.container}>
      <CircularProgressBar progress={progress} />
      {count !== -1 && (
        <Animated.Text style={[styles.count, animatedStyle]}>
          {count}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    position: 'absolute',
    fontWeight: '900',
  },
});

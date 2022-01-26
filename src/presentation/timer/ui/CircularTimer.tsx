import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import CircularProgressBar from '@common/component/CircularProgressBar';
import { NotificationTimer } from '@model/NotificationTimer';
import { TimerEvent } from '@model/Timer';

export default function CircularTimer({ timer }: { timer: NotificationTimer }) {
  const progress = useSharedValue<number>(1);

  useEffect(() => {
    const handleRun = (e: TimerEvent) => {
      progress.value = withTiming(e.progress, { duration: 100 });
    };
    timer.addEventListener('run', handleRun);
    return () => {
      timer.removeEventListener('run', handleRun);
    };
  }, [timer]);

  return (
    <View style={styles.container}>
      <CircularProgressBar progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    marginLeft: 6,
  },
});

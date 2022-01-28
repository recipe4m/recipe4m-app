import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import CircularProgressBar from '@common/component/CircularProgressBar';
import Medium from '@common/component/text/Medium';
import { NotificationTimer } from '@model/NotificationTimer';
import { TimerEvent } from '@model/Timer';

export default function CircularTimer({ timer }: { timer: NotificationTimer }) {
  const progress = useSharedValue<number>(1);
  const [count, setCount] = useState<number>(-1);

  useEffect(() => {
    const handleRun = (e: TimerEvent) => {
      progress.value = withTiming(e.progress, { duration: 100 });

      if (e.remainTimeout < 5000) {
        const _count = Math.floor(e.remainTimeout / 1000) + 1;
        console.log(e.remainTimeout, _count);
        if (count !== _count) setCount(_count);
      }
    };
    timer.addEventListener('run', handleRun);
    return () => {
      timer.removeEventListener('run', handleRun);
    };
  }, [timer, count]);

  return (
    <View style={styles.container}>
      <CircularProgressBar progress={progress} />
      {count !== -1 && <Medium style={styles.count}>{count}</Medium>}
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
  },
});

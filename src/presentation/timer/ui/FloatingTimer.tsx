import React, { useEffect, useState } from 'react';

import CircularProgressBar from '../../common/component/CircularProgressBar';
import FloatingTimerView from './FloatingTimerView';
import { NotificationTimer } from '@model/NotificationTimer';
import { Size } from '@style/Size';
import { StyleSheet } from 'react-native';
import { TimerEvent } from '@model/Timer';
import { useTimer } from '@application/context/TimerContext';

interface FloatingTimerProps {}

export default function FloatingTimer({}: FloatingTimerProps) {
  const { timers } = useTimer();

  console.log(timers);

  if (timers.length === 0) return null;

  return (
    <FloatingTimerView style={[styles.container]}>
      {timers.map(timer => (
        <Timer key={timer.id} timer={timer} />
      ))}
    </FloatingTimerView>
  );
}

function Timer({ timer }: { timer: NotificationTimer }) {
  const [progress, setProgress] = useState<number>(1);

  useEffect(() => {
    const handleRun = ({ progress }: TimerEvent) => {
      setProgress(progress);
    };
    timer.addEventListener('run', handleRun);
    return () => {
      timer.removeEventListener('run', handleRun);
    };
  }, [timer]);
  return <CircularProgressBar progress={progress} />;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: Size.BOTTOM_TAB_BAR_HEIGHT,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

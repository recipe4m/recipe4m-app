import CircularTimer from './CircularTimer';
import FloatingTimerView from './FloatingTimerView';
import React from 'react';
import { useTimer } from '@application/context/TimerContext';

interface FloatingTimerProps {}

export default function FloatingTimer({}: FloatingTimerProps) {
  const { timers } = useTimer();

  if (timers.length === 0) return null;

  return (
    <FloatingTimerView>
      {timers.map(timer => (
        <CircularTimer key={timer.id} timer={timer} />
      ))}
    </FloatingTimerView>
  );
}

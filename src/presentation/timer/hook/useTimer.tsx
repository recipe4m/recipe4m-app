import timerUseCase from '@useCase/TimerUseCase';
import { useMemo } from 'react';

export default function useTimer() {
  const timers = useMemo(() => timerUseCase.timers, []);

  return {};
}

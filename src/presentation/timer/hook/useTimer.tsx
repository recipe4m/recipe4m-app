import { useEffect, useMemo } from 'react';

import { RootState } from '@reducer';
import timerUseCase from '@useCase/TimerUseCase';
import { useSelector } from 'react-redux';

export default function useTimer() {
  console.log('useTimer');
  const timer = useSelector(
    ({ timer }: RootState) => timer,
    (left, right) => left === right,
  );

  const timers = useMemo(() => timerUseCase.timers, [timer]);

  useEffect(() => {
    console.log('useEffect', timer);
  }, [timer]);

  return { timers };
}

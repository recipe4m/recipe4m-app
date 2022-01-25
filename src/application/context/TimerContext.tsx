import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { removeTimer, setTimer, setTimers } from '@reducer/Timer';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationTimer } from '@model/NotificationTimer';
import { RootState } from '@reducer';
import timerUseCase from '@useCase/TimerUseCase';

export interface TimerProviderProps {}

export interface TimerContextValue {
  timers: NotificationTimer[];
}

export const TimerContext = createContext<TimerContextValue>({ timers: [] });

export function TimerProvider({
  children,
}: PropsWithChildren<TimerProviderProps>) {
  const dispatch = useDispatch();
  const timer = useSelector(
    ({ timer }: RootState) => timer,
    (left, right) => left.timers === right.timers,
  );

  const timers = useMemo(() => {
    return timerUseCase.timers;
  }, [timer]);

  const sync = useCallback(() => {
    timer.timers.forEach(timer => {
      if (!timerUseCase.timers.some(({ id }) => timer.id === id)) {
        timerUseCase.addTimer({
          ...timer,
          onStart: () => {
            dispatch(setTimer({ ...timer, status: 'RUN' }));
          },
          onPause: ({ remainTimeout }) => {
            dispatch(setTimer({ ...timer, status: 'PAUSE', remainTimeout }));
          },
          onResume: () => {
            dispatch(setTimer({ ...timer, status: 'RUN' }));
          },
          onEnd: () => {
            console.log('called onEnd');
            dispatch(removeTimer(timer));
          },
        });
      }
    });
  }, [timer]);

  useEffect(sync, [sync]);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications(notifications => {
      const timers = timer.timers.filter(
        timer =>
          timer.status === 'PAUSE' ||
          notifications.some(({ id }) => timer.id === id),
      );

      dispatch(setTimers(timers));
    });
  }, []);

  return (
    <TimerContext.Provider value={{ timers }}>{children}</TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}

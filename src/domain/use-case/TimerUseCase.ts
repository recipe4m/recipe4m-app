import * as TimerReducer from '@reducer/Timer';

import {
  NotificationTimer,
  NotificationTimerOptions,
} from '@model/NotificationTimer';
import { Timer, TimerEvent } from '@model/Timer';

export interface TimerOptions extends NotificationTimerOptions {
  timeout: number;
  onStart?: (event: TimerEvent) => void;
  onRun?: (Event: TimerEvent) => void;
  onPause?: (Event: TimerEvent) => void;
  onResume?: (Event: TimerEvent) => void;
  onStop?: (Event: TimerEvent) => void;
  onEnd?: (Event: TimerEvent) => void;
}

export class TimersUseCase {
  private _timers: NotificationTimer[] = [];
  get timers() {
    return this._timers;
  }

  addTimer({
    onStart,
    onRun,
    onPause,
    onResume,
    onStop,
    onEnd,
    ...timerOptions
  }: TimerOptions) {
    const timer = new NotificationTimer(timerOptions);

    timer.addEventListener('end', () => {
      this._timers = this._timers.filter(_timer => _timer !== timer);
    });

    if (onStart) timer.addEventListener('start', onStart);
    if (onRun) timer.addEventListener('run', onRun);
    if (onPause) timer.addEventListener('pause', onPause);
    if (onResume) timer.addEventListener('resume', onResume);
    if (onStop) timer.addEventListener('stop', onStop);
    if (onEnd) timer.addEventListener('end', onEnd);

    this._timers.push(timer);

    if (timer.status === 'READY') timer.start();
    else if (timer.status === 'RUN') timer.run();

    return timer;
  }

  removeTimer(timer: NotificationTimer) {
    timer.stop();
    this._timers = this._timers.filter(_timer => _timer !== timer);
  }
}

export default new TimersUseCase();

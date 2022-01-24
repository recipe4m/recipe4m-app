import * as TimerReducer from '@reducer/Timer';

import { Timer, TimerEvent } from '@model/Timer';

import { NotificationTimer } from '@model/NotificationTimer';

export interface TimerOptions {
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
    timeout,
    onStart,
    onRun,
    onPause,
    onResume,
    onStop,
    onEnd,
  }: TimerOptions) {
    const timer = new NotificationTimer({ timeout });

    if (onStart) timer.addEventListener('start', onStart);
    if (onRun) timer.addEventListener('run', onRun);
    if (onPause) timer.addEventListener('pause', onPause);
    if (onResume) timer.addEventListener('resume', onResume);
    if (onStop) timer.addEventListener('stop', onStop);
    if (onEnd) timer.addEventListener('end', onEnd);

    timer.addEventListener('end', () => {
      this._timers = this._timers.filter(_timer => _timer !== timer);
    });

    this._timers.push(timer);

    timer.start();

    return timer;
  }

  removeTimer(timer: Timer) {
    timer.stop();
    this._timers = this._timers.filter(_timer => _timer !== timer);
  }

  sync(timers: TimerReducer.Timer[]) {}
}

export default new TimersUseCase();

import { Timer, TimerEvent } from 'src/data/model/Timer';

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
  private _timers: Timer[] = [];
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
    const timer = new Timer(timeout);

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
}

export default new TimersUseCase();

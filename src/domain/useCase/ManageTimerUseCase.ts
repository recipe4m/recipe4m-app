import { Timer, TimerEvent } from 'src/data/model/Timer';

export interface TimerOptions {
  timeout: number;
  onStart?: (event: TimerEvent) => void;
  onRun?: (Event: TimerEvent) => void;
  onPause?: (Event: TimerEvent) => void;
  onEnd?: (Event: TimerEvent) => void;
}

export class ManageTimerUseCase {
  timers: Timer[] = [];

  addTimer({ timeout, onStart, onRun, onPause, onEnd }: TimerOptions) {
    const timer = new Timer(timeout);

    if (onStart) timer.addEventListener('start', onStart);
    if (onRun) timer.addEventListener('run', onRun);
    if (onPause) timer.addEventListener('pause', onPause);
    if (onEnd) timer.addEventListener('end', onEnd);

    timer.addEventListener('end', () => {
      this.removeTimer(timer);
    });

    this.timers.push(timer);

    return timer;
  }

  removeTimer(timer: Timer) {
    if (timer.state === 'RUN') timer.end();
    this.timers = this.timers.filter(_timer => _timer !== timer);
  }
}

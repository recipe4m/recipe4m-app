import { getRandomId } from '@lib/Random';
export type Status = 'READY' | 'START' | 'RUN' | 'PAUSE' | 'STOP' | 'END';

export interface TimerEvent {
  target: Timer;
  status: Status;
  timeout: number;
  remainTimeout: number;
  progress: number;
}

type EventName = 'start' | 'run' | 'pause' | 'resume' | 'stop' | 'end';
type EventCallback = (event: TimerEvent) => void;

export interface TimerOptions {
  id?: string;
  status?: Status;
  timeout: number;
  remainTimeout?: number;
}

export class Timer {
  static CLOCK_INTERVAL = 100;

  /**
   *
   */
  id: string;

  /**
   *
   */
  private _timeout: number;
  get timeout() {
    return this._timeout;
  }

  /**
   * remainTimeout(ms)
   */
  private _remainTimeout: number;
  get remainTimeout() {
    return this._remainTimeout;
  }

  /**
   * remain
   */

  /**
   * interval
   */
  private _interval: number | null = null;

  /**
   * status
   */
  private _status: Status = 'READY';
  get status() {
    return this._status;
  }

  /**
   * date
   */
  protected _date: Date | null = null;

  /**
   * events
   */
  private _eventListener: Record<EventName, EventCallback[]> = {
    start: [],
    run: [],
    pause: [],
    resume: [],
    stop: [],
    end: [],
  };

  constructor({
    id = getRandomId(),
    status = 'READY',
    timeout,
    remainTimeout,
  }: TimerOptions) {
    this.id = id;
    this._status = status;
    this._timeout = timeout;
    this._remainTimeout = remainTimeout || timeout;
  }

  protected get event() {
    return {
      target: this,
      status: this._status,
      timeout: this._timeout,
      remainTimeout: this._remainTimeout,
      progress: this._remainTimeout / this._timeout,
    };
  }

  start() {
    if (this._interval) throw new Error('Timer has already started.');
    this._status = 'START';
    this._date = new Date(Date.now() + this._remainTimeout);
    this._excuteEventListener('start');
    this.run();
  }

  run() {
    if (this._interval) throw new Error('Timer has already run.');
    this._status = 'RUN';
    this._excuteEventListener('run');
    this._interval = setInterval(() => {
      this._remainTimeout = (this._date as Date).valueOf() - Date.now();
      this._excuteEventListener('run');
      if (this._remainTimeout < 0) this.end();
    }, Timer.CLOCK_INTERVAL);
  }

  pause() {
    if (!this._interval) throw new Error('Timer is not running.');
    this._status = 'PAUSE';
    clearInterval(this._interval);
    this._interval = null;
    this._excuteEventListener('pause');
  }

  resume() {
    if (this._status !== 'PAUSE') throw new Error('Timer is not pause.');
    this._status = 'RUN';
    this._excuteEventListener('resume');
    this._date = new Date(Date.now() + this._remainTimeout);
    this._interval = setInterval(() => {
      this._remainTimeout = (this._date as Date).valueOf() - Date.now();
      this._excuteEventListener('run');
      if (this._remainTimeout < 0) this.end();
    }, Timer.CLOCK_INTERVAL);
  }

  stop() {
    this._status = 'STOP';
    this._excuteEventListener('stop');
    this.end();
  }

  end() {
    if (this._interval) clearInterval(this._interval);
    this._status = 'END';
    this._interval = null;
    this._excuteEventListener('end');
  }

  protected _excuteEventListener(name: EventName) {
    this._eventListener[name].forEach(callback => callback(this.event));
  }

  addEventListener(name: EventName, callback: EventCallback) {
    this._eventListener[name].push(callback);
  }

  removeEventListener(name: EventName, callback: EventCallback) {
    this._eventListener[name] = this._eventListener[name].filter(
      _callback => _callback !== callback,
    );
  }

  removeAllEventListener(name: EventName) {
    this._eventListener[name] = [];
  }
}

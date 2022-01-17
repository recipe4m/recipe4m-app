type Status = 'READY' | 'START' | 'RUN' | 'PAUSE' | 'END';

export interface TimerEvent {
  status: Status;
  timeout: number;
}
type EventName = 'start' | 'run' | 'pause' | 'end';
type EventCallback = (event: TimerEvent) => void;

export class Timer {
  static INTERVAL = 100;

  /**
   * timeout(ms)
   */
  private _timeout: number;

  /**
   * interval
   */
  private _interval: number | null = null;

  /**
   * status
   */
  private _status: Status = 'READY';
  get state() {
    return this._status;
  }

  /**
   * events
   */
  private _eventListener: Record<EventName, EventCallback[]> = {
    start: [],
    run: [],
    pause: [],
    end: [],
  };

  constructor(timeout: number) {
    this._timeout = timeout;
  }

  private get event() {
    return { status: this._status, timeout: this._timeout };
  }

  start() {
    if (this._interval) throw new Error('Timer has already started.');
    this._status = 'START';
    this._excuteEventListener('start');
    this.run();
  }

  pause() {
    if (!this._interval) throw new Error('Timer is not running.');
    this._status = 'PAUSE';
    clearInterval(this._interval);
    this._interval = null;
    this._excuteEventListener('pause');
  }

  run() {
    if (this._interval) throw new Error('Timer has already run.');
    this._status = 'RUN';
    this._excuteEventListener('run');
    this._interval = setInterval(() => {
      this._timeout -= Timer.INTERVAL;
      this._excuteEventListener('run');
      if (this._timeout < 0) this.end();
    }, Timer.INTERVAL);
  }

  end() {
    if (!this._interval) throw new Error('Timer is not running');
    this._status = 'END';
    clearInterval(this._interval);
    this._interval = null;
    this._excuteEventListener('end');
  }

  private _excuteEventListener(name: EventName) {
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

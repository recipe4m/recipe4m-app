type State = 'READY' | 'START' | 'RUN' | 'PAUSE' | 'END';

export interface TimerEvent {
  state: State;
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
  private _interval: NodeJS.Timer | null = null;

  /**
   * state
   */
  private _state: State = 'READY';
  get state() {
    return this._state;
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
    return { state: this._state, timeout: this._timeout };
  }

  start() {
    if (this._interval) throw new Error('Timer has already started.');
    this._state = 'START';
    this._excuteEventListener('start');
    this.run();
  }

  pause() {
    if (!this._interval) throw new Error('Timer is not running.');
    this._state = 'PAUSE';
    clearInterval(this._interval);
    this._interval = null;
    this._excuteEventListener('pause');
  }

  run() {
    if (this._interval) throw new Error('Timer has already run.');
    this._state = 'RUN';
    this._excuteEventListener('run');
    this._interval = setInterval(() => {
      this._timeout -= Timer.INTERVAL;
      this._excuteEventListener('run');
      if (this._timeout < 0) this.end();
    }, Timer.INTERVAL);
  }

  end() {
    if (!this._interval) throw new Error('Timer is not running');
    this._state = 'END';
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

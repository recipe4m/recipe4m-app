import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import { Timer, TimerOptions } from './Timer';

import { Notification } from '@model/Notification';
import { getRandomId } from '@lib/Random';

export interface NotificationTimerOptions extends TimerOptions {
  date?: Date | null;
  notificationId?: string;
  notificationObject: PushNotificationScheduleObject;
}

const defaultPushNotificationScheduleObject: Partial<PushNotificationScheduleObject> =
  {
    channelId: Notification.Channel.Timer.channelId,
    allowWhileIdle: true,
    repeatTime: 1,
    priority: 'high',
    ignoreInForeground: false,
    vibrate: true,
  };

export class NotificationTimer extends Timer {
  private _notificationObject: PushNotificationScheduleObject;
  get notificationObject() {
    return this._notificationObject;
  }

  private _id: string;

  constructor({
    id = getRandomId(),
    date = null,
    notificationObject,
    ...timerOptions
  }: NotificationTimerOptions) {
    const _date = date ? new Date(date) : null;
    super({
      ...timerOptions,
      id,
      date: _date,
    });
    this._id = id;
    this._date = _date;
    this._notificationObject = notificationObject;
  }

  start(): void {
    super.start();

    PushNotification.localNotificationSchedule({
      ...defaultPushNotificationScheduleObject,
      ...this._notificationObject,
      date: this._date as Date,
      id: this._id,
    });
  }

  pause(): void {
    super.pause();

    PushNotification.cancelLocalNotification(this._id);
  }

  resume(): void {
    super.resume();

    PushNotification.localNotificationSchedule({
      ...defaultPushNotificationScheduleObject,
      ...this._notificationObject,
      date: this._date as Date,
      id: this._id,
    });
  }

  stop(): void {
    super.stop();

    PushNotification.cancelLocalNotification(this._id);
  }
}

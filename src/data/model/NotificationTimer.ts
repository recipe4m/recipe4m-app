import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import { Timer, TimerOptions } from './Timer';

import { Notification } from '@model/Notification';
import { getRandomId } from '@lib/random';

export interface NotificationTimerOptions extends TimerOptions {
  date?: Date | null;
  notificationId?: string;
  notificationObject: PushNotificationScheduleObject;
}

const defaultPushNotificationScheduleObject = {
  channelId: Notification.Channel.Timer.channelId,
};

export class NotificationTimer extends Timer {
  private _notificationObject: PushNotificationScheduleObject;

  private _notificationId: string;

  private _date: Date | null;

  constructor({
    date = null,
    notificationId = getRandomId(),
    notificationObject,
    ...timerOptions
  }: NotificationTimerOptions) {
    super(timerOptions);
    this._date = date;
    this._notificationId = notificationId;
    this._notificationObject = notificationObject;
  }

  start(): void {
    super.start();

    this._date = new Date(Date.now() + this.timeout);

    PushNotification.localNotificationSchedule({
      ...defaultPushNotificationScheduleObject,
      ...this._notificationObject,
      date: this._date,
    });
  }

  pause(): void {
    super.pause();

    PushNotification.cancelLocalNotification(this._notificationId);
  }

  resume(): void {
    this.start();
  }

  stop(): void {
    super.stop();

    PushNotification.cancelLocalNotification(this._notificationId);
  }
}

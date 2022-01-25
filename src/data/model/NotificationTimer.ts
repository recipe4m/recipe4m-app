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

const defaultPushNotificationScheduleObject = {
  channelId: Notification.Channel.Timer.channelId,
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
    super({ ...timerOptions, id });
    this._id = id;
    this._date = date;
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

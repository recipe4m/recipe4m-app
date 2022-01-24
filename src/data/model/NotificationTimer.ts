import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import { Timer, TimerOptions } from './Timer';

import { Notification } from '@model/Notification';
import { v4 as uuidv4 } from 'uuid';

interface NotificationTimerOptions extends TimerOptions {
  date?: Date | null;
  notificationObject: PushNotificationScheduleObject;
}

const defaultPushNotificationScheduleObject = {
  channelId: Notification.Channel.Timer.channelId,
};

export class NotificationTimer extends Timer {
  private _notificationObject: PushNotificationScheduleObject;

  private notificationId: string = uuidv4();

  private _date: Date | null;

  constructor({
    date = null,
    notificationObject,
    ...timerOptions
  }: NotificationTimerOptions) {
    super(timerOptions);
    this._date = date;
    this._notificationObject = notificationObject;
  }

  start(): void {
    super.start();

    this.notificationId = uuidv4();
    this._date = new Date(Date.now() + this.timeout);

    PushNotification.localNotificationSchedule({
      ...defaultPushNotificationScheduleObject,
      ...this._notificationObject,
      date: this._date,
    });
  }

  pause(): void {
    super.pause();

    PushNotification.cancelLocalNotification(this.notificationId);
  }

  resume(): void {
    this.start();
  }

  stop(): void {
    super.stop();

    PushNotification.cancelLocalNotification(this.notificationId);
  }
}

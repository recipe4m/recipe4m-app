import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';

import { Notification } from '@model/Notification';
import { Timer } from './Timer';
import { v4 as uuidv4 } from 'uuid';

type PushNotificationScheduleOptions = Omit<
  PushNotificationScheduleObject,
  'channelId' | 'date'
>;

interface NotificationTimerOptions extends PushNotificationScheduleOptions {
  timeout: number;
}

const defaultPushNotificationScheduleObject = {
  channelId: Notification.Channel.Timer.channelId,
};

export class NotificationTimer extends Timer {
  private _pushNotificationScheduleObject: PushNotificationScheduleOptions;

  notificationId: string = uuidv4();

  constructor({ timeout, ...options }: NotificationTimerOptions) {
    super(timeout);
    this._pushNotificationScheduleObject = options;
  }

  start(): void {
    super.start();

    this.notificationId = uuidv4();

    PushNotification.localNotificationSchedule({
      ...defaultPushNotificationScheduleObject,
      ...this._pushNotificationScheduleObject,
      date: new Date(Date.now() + this.timeout),
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

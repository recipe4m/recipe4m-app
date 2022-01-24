import PushNotification, {
  ChannelObject,
  Importance,
} from 'react-native-push-notification';

import { Notification } from '@model/Notification';

export class NotificationUseCase {
  private getChannels() {
    return Object.values(Notification.Channel);
  }

  syncChannels() {
    PushNotification.getChannels(channelIds => {
      this.getChannels().forEach(channel => {
        if (!channelIds.some(channelId => channelId === channel.channelId)) {
          PushNotification.createChannel(channel, (created: boolean) => {
            if (created) {
              console.debug(
                `Channel registration successed: ${channel.channelId}`,
              );
            } else {
              console.debug(
                `Channel registration failed: ${channel.channelId}`,
              );
            }
          });
        }
      });
      channelIds.forEach(channelId => {
        if (
          !this.getChannels().some(channel => channel.channelId === channelId)
        ) {
          PushNotification.deleteChannel(channelId);
        }
      });
    });
  }
}

export default new NotificationUseCase();

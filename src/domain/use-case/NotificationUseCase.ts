import PushNotification, {
  ChannelObject,
  Importance,
} from 'react-native-push-notification';

export class NotificationUseCase {
  static CHANNELS: ChannelObject[] = [
    {
      channelId: 'recipe4m_timer',
      channelName: 'Timer',
      channelDescription: 'Channel for notification when timer completes',
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
      playSound: true,
    },
    {
      channelId: 'recipe4m_interaction',
      channelName: 'Interaction',
      channelDescription:
        'Notification channel about user interaction. For example, like, subscribe, etc',
      soundName: 'default',
      importance: Importance.DEFAULT,
      vibrate: true,
      playSound: true,
    },
    {
      channelId: 'recipe4m_information',
      channelName: 'Information',
      channelDescription:
        'Notification channels for subscriptions and interests',
      soundName: 'default',
      importance: Importance.DEFAULT,
      vibrate: true,
      playSound: true,
    },
    {
      channelId: 'recipe4m_marketing',
      channelName: 'Marketing',
      channelDescription: 'Notification channels about marketing',
      soundName: 'default',
      importance: Importance.MIN,
      vibrate: false,
      playSound: false,
    },
  ];

  syncChannels() {
    PushNotification.getChannels(channelIds => {
      NotificationUseCase.CHANNELS.forEach(channel => {
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
          !NotificationUseCase.CHANNELS.some(
            channel => channel.channelId === channelId,
          )
        ) {
          PushNotification.deleteChannel(channelId);
        }
      });
    });
  }
}

export default new NotificationUseCase();

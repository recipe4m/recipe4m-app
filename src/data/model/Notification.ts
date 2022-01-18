import { ChannelObject, Importance } from 'react-native-push-notification';

type ChannelKeys = 'Timer' | 'Interaction' | 'Information' | 'Marketing';

export class Notification {
  static Channel: Record<ChannelKeys, ChannelObject> = {
    Timer: {
      channelId: 'recipe4m_timer',
      channelName: 'Timer',
      channelDescription: 'Channel for notification when timer completes',
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
      playSound: true,
    },
    Interaction: {
      channelId: 'recipe4m_interaction',
      channelName: 'Interaction',
      channelDescription:
        'Notification channel about user interaction. For example, like, subscribe, etc',
      soundName: 'default',
      importance: Importance.DEFAULT,
      vibrate: true,
      playSound: true,
    },
    Information: {
      channelId: 'recipe4m_information',
      channelName: 'Information',
      channelDescription:
        'Notification channels for subscriptions and interests',
      soundName: 'default',
      importance: Importance.DEFAULT,
      vibrate: true,
      playSound: true,
    },
    Marketing: {
      channelId: 'recipe4m_marketing',
      channelName: 'Marketing',
      channelDescription: 'Notification channels about marketing',
      soundName: 'default',
      importance: Importance.MIN,
      vibrate: true,
      playSound: true,
    },
  };
}

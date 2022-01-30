import notificationUseCase from '@useCase/NotificationUseCase';
import { useEffect } from 'react';

export default function useNotification() {
  useEffect(() => {
    try {
      // PushNotification.requestPermissions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    notificationUseCase.syncChannels();
  }, []);
}

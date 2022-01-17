import notificationUseCase from '@useCase/NotificationUseCase';
import { useEffect } from 'react';

export default function useNotification() {
  useEffect(() => {
    notificationUseCase.syncChannels();
  }, []);
}

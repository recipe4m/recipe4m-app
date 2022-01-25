import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect } from 'react';
import store, { persistor } from './src/application/store';

import { AuthProvider } from '@application/context/AuthContext';
import { DialogProvider } from '@application/context/DialogContext';
import FloatingTimer from '@presentation/timer/ui/FloatingTimer';
import Navigation from './src/application/navigation';
import { Notification } from '@model/Notification';
import { PersistGate } from 'redux-persist/integration/react';
import PushNotification from 'react-native-push-notification';
import { Provider as ReduxProvider } from 'react-redux';
import RootView from '@common/component/RootView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from '@navigation/StackNavigator';
import { TimerProvider } from '@application/context/TimerContext';
import useNotification from '@common/hook/useNotification';

const queryClient = new QueryClient();

export default function App() {
  useNotification();

  useEffect(() => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: 'My Notification Message', // (required)
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

      date: new Date(Date.now() + 5 * 1000),

      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.

      channelId: Notification.Channel.Timer.channelId,
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>
            <AuthProvider>
              <SafeAreaProvider>
                <RootView>
                  <DialogProvider>
                    <Navigation>
                      <StackNavigator />
                    </Navigation>
                    <FloatingTimer />
                  </DialogProvider>
                </RootView>
              </SafeAreaProvider>
            </AuthProvider>
          </TimerProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

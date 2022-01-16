import { ActivityIndicator, Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect } from 'react';
import store, { persistor } from './src/application/store';

import { AuthProvider } from '@application/context/AuthContext';
import { DialogProvider } from '@application/context/DialogContext';
import Navigation from './src/application/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'recipe4m-channel-default', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    setTimeout(() => {
      PushNotification.localNotificationSchedule({
        channelId: 'recipe4m-channel-default',
        //... You can use all the options from localNotifications
        message: 'My Notification Message', // (required)
        date: new Date(new Date().valueOf() + 5 * 1000),
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
      PushNotification.setApplicationIconBadgeNumber(10);
    }, 5000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeView>
              <DialogProvider>
                <Navigation>
                  <StackNavigator />
                </Navigation>
              </DialogProvider>
            </ThemeView>
          </AuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

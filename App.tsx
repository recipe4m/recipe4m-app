import { QueryClient, QueryClientProvider } from 'react-query';
import store, { persistor } from './src/application/store';

import { ActivityIndicator } from 'react-native';
import { AuthProvider } from '@application/context/AuthContext';
import { DialogProvider } from '@application/context/DialogContext';
import Navigation from './src/application/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';
import useNotification from '@common/hook/useNotification';

const queryClient = new QueryClient();

export default function App() {
  useNotification();

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

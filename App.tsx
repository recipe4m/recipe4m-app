import { QueryClient, QueryClientProvider } from 'react-query';
import store, { persistor } from './src/application/store';

import { AuthProvider } from '@application/context/AuthContext';
import { DialogProvider } from '@application/context/DialogContext';
import FloatingTimer from '@presentation/timer/ui/FloatingTimer';
import Navigation from './src/application/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import RootView from '@common/component/RootView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from '@navigation/StackNavigator';
import useNotification from '@common/hook/useNotification';

const queryClient = new QueryClient();

export default function App() {
  useNotification();

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

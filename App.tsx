import { QueryClient, QueryClientProvider } from 'react-query';
import store, { persistor } from './src/application/store';

import { DialogProvider } from '@application/context/DialogContext';
import Navigation from './src/application/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeView>
            <DialogProvider>
              <Navigation>
                <StackNavigator />
              </Navigation>
            </DialogProvider>
          </ThemeView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

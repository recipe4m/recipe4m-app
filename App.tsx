import { QueryClient, QueryClientProvider } from 'react-query';

import { DialogProvider } from '@application/context/DialogContext';
import Navigation from './src/application/navigation';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';
import store from './src/application/store';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeView>
          <DialogProvider>
            <Navigation>
              <StackNavigator />
            </Navigation>
          </DialogProvider>
        </ThemeView>
      </QueryClientProvider>
    </Provider>
  );
}

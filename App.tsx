import Navigation from './src/application/navigation';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';
import store from './src/application/store';
import { DialogProvider } from '@application/context/DialogContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeView>
        <DialogProvider>
          <Navigation>
            <StackNavigator />
          </Navigation>
        </DialogProvider>
      </ThemeView>
    </Provider>
  );
}

import Navigation from './src/application/navigation';
import { Provider } from 'react-redux';
import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import ThemeView from '@common/component/ThemeView';
import store from './src/application/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeView>
        <Navigation>
          <StackNavigator />
        </Navigation>
      </ThemeView>
    </Provider>
  );
}

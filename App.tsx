import { StyleSheet, View } from 'react-native';

import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import React from 'react';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { StyleSheet, View } from 'react-native';

import Navigation from './src/navigation';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { StyleSheet, View } from 'react-native';

import BottomTabView from '@common/component/BottomTabView';
import React from 'react';

export default function ShortcutScreen() {
  return (
    <BottomTabView style={styles.container}>
      <View />
    </BottomTabView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

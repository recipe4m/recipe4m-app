import { Image, StyleSheet } from 'react-native';

import BottomTabView from '@common/component/BottomTabView';
import React from 'react';

export default function ShortcutScreen() {
  return (
    <BottomTabView style={styles.container}>
      <Image
        style={{ width: '100%', height: 2000 }}
        source={{ uri: 'https://pbs.twimg.com/media/EFHNcJQUcAI_acX.jpg' }}
      />
    </BottomTabView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

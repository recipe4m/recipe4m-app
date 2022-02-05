import { Pressable, StyleSheet, Text, View } from 'react-native';

import HeaderButton from '@common/component/button/HeaderButton';
import React from 'react';

export default function TimerCardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderButton>취소</HeaderButton>
        <HeaderButton>저장</HeaderButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
});

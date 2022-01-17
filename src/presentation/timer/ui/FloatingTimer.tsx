import { Pressable, StyleSheet, Text, View } from 'react-native';

import FloatingTimerView from './FloatingTimerView';
import React from 'react';
import { Size } from '@style/Size';

interface FloatingTimerProps {}

export default function FloatingTimer({}: FloatingTimerProps) {
  return (
    <FloatingTimerView style={[styles.container]}>
      <View
        style={{
          width: 48,
          height: 48,
          borderWidth: 1,
          borderRadius: 24,
          margin: 8,
        }}
      />
      <View
        style={{
          width: 48,
          height: 48,
          borderWidth: 1,
          borderRadius: 24,
          margin: 8,
        }}
      />
      <Pressable
        style={{
          width: 36,
          height: 36,
          borderWidth: 1,
          borderRadius: 18,
          margin: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{`>`}</Text>
      </Pressable>
    </FloatingTimerView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: Size.BOTTOM_TAB_BAR_HEIGHT,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

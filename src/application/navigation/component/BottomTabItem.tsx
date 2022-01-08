import { Pressable, StyleSheet, Text } from 'react-native';

import IcShortcut from '@asset/icon/ic_shortcut.svg';
import React from 'react';

interface BottomTabItemProps {
  label: string;
}

export default function BottomTabItem({ label }: BottomTabItemProps) {
  return (
    <Pressable style={styles.wrapper}>
      <IcShortcut width={26} height={26} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  label: {
    fontSize: 9,
    color: '#444',
    marginTop: 4,
  },
});

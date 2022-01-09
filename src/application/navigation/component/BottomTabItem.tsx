import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useCallback } from 'react';

import IcShortcut from '@asset/icon/ic_shortcut.svg';

export interface Item {
  tab: string;
  label: string;
}
interface BottomTabItemProps {
  item: Item;
  isSelected: boolean;
  onPress: (item: Item) => void;
}

export default function BottomTabItem({
  item,
  isSelected,
  onPress,
}: BottomTabItemProps) {
  const { label } = item;

  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <IcShortcut width={24} height={24} />
      <Text style={[styles.label, isSelected && { color: 'blue' }]}>
        {label}
      </Text>
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
    marginTop: 3,
  },
});

import { Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useMemo } from 'react';

import BottomTabItemLabel from './BottomTabItemLabel';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ScreenName } from '@navigation/ScreenName';
import useTheme from '@common/hook/useTheme';

export interface Item {
  tab: string;
  label: string;
  iconName: string;
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
  const { colors } = useTheme();
  const { label, iconName } = item;

  const color = useMemo(
    () =>
      isSelected ? colors.BOTTOM_TAB_LABEL_ACTIVE : colors.BOTTOM_TAB_LABEL,
    [colors, isSelected],
  );

  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <MaterialIcon name={iconName} size={22} color={color} />
      <BottomTabItemLabel isSelected={isSelected}>{label}</BottomTabItemLabel>
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
    marginVertical: 1,
  },
});

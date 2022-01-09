import { Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useMemo } from 'react';

import BottomTabItemLabel from './BottomTabItemLabel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScreenName } from '@navigation/ScreenName';
import useTheme from '@common/hook/useTheme';

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
  const { colors } = useTheme();
  const { tab, label } = item;

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
      {tab === ScreenName.ShortcutScreen && (
        <Icon name="whatshot" size={22} color={color} />
      )}
      {tab === ScreenName.SearchScreen && (
        <Icon name="search" size={22} color={color} />
      )}
      {tab === ScreenName.CreateScreen && (
        <Icon name="add-circle-outline" size={22} color={color} />
      )}
      {tab === ScreenName.RecipeScreen && (
        <Icon name="library-books" size={22} color={color} />
      )}
      {tab === ScreenName.ProfileScreen && (
        <Icon name="person" size={22} color={color} />
      )}
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

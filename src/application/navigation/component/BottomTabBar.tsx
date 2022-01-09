import BottomTabItem, { Item } from './BottomTabItem';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useCallback, useState } from 'react';

import { EdgeInsets } from 'react-native-safe-area-context';
import { ScreenName } from '@navigation/ScreenName';
import { TabActions } from '@react-navigation/native';
import { BottomTabBarProps as TabBarProps } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import useTheme from '@common/hook/useTheme';

interface BottomTabBarProps extends TabBarProps {
  insets: EdgeInsets;
}

const BOTTOM_TAB_ITEMS: Item[] = [
  { tab: ScreenName.ShortcutScreen, label: 'Shortcut' },
  { tab: ScreenName.SearchScreen, label: 'Search' },
  { tab: ScreenName.CreateScreen, label: 'Create' },
  { tab: ScreenName.RecipeScreen, label: 'Recipe' },
  { tab: ScreenName.ProfileScreen, label: 'Profile' },
];

export default function BottomTabBar({
  insets,
  navigation,
}: BottomTabBarProps) {
  const { theme, colors } = useTheme();

  const [tab, setTab] = useState<string>(BOTTOM_TAB_ITEMS[0].tab);

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...styles.container,
      paddingBottom: insets.bottom,
      borderTopColor: colors.BOTTOM_TAB_BAR_BORDER,
    }),
    [insets, colors],
  );

  const backgroundStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.BOTTOM_TAB_BAR_BACKGROUND,
      opacity: Platform.OS === 'android' ? 1 : theme === 'light' ? 0.97 : 0.9,
    }),
    [colors, theme],
  );

  const handlePressItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ tab }: Item) => {
      navigation.dispatch(TabActions.jumpTo(tab));
      setTab(tab);
    },
    [navigation],
  );

  return (
    <View style={containerStyle}>
      <View style={backgroundStyle} />
      {BOTTOM_TAB_ITEMS.map(item => (
        <BottomTabItem
          key={item.tab}
          item={item}
          isSelected={tab === item.tab}
          onPress={handlePressItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

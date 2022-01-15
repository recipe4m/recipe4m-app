import BottomTabItem, { Item } from './BottomTabItem';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useCallback, useState } from 'react';
import { StackActions, TabActions } from '@react-navigation/native';

import { EdgeInsets } from 'react-native-safe-area-context';
import { RootState } from '@reducer';
import { ScreenName } from '@navigation/ScreenName';
import { BottomTabBarProps as TabBarProps } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '@common/hook/useTheme';

interface BottomTabBarProps extends TabBarProps {
  insets: EdgeInsets;
}

const BOTTOM_TAB_ITEMS: Item[] = [
  { tab: ScreenName.ShortcutScreen, label: 'Shortcut', iconName: 'whatshot' },
  { tab: ScreenName.RecipeScreen, label: 'Recipe', iconName: 'tag' },
  {
    tab: ScreenName.CreateScreen,
    label: 'Create',
    iconName: 'add-circle-outline',
  },
  { tab: ScreenName.NoteScreen, label: 'Note', iconName: 'view-sidebar' },
  { tab: ScreenName.ProfileScreen, label: 'Profile', iconName: 'person' },
];

export default function BottomTabBar({
  insets,
  navigation,
}: BottomTabBarProps) {
  const isSignedIn = useSelector(
    ({ auth: { isSignedIn } }: RootState) => isSignedIn,
  );
  const { theme, colors } = useTheme();

  const [tab, setTab] = useState<string>(BOTTOM_TAB_ITEMS[0].tab);

  const bottomTabItems = useMemo(() => {
    return isSignedIn
      ? BOTTOM_TAB_ITEMS
      : BOTTOM_TAB_ITEMS.filter(({ tab }) => tab !== ScreenName.CreateScreen);
  }, [isSignedIn]);

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
      if (tab === ScreenName.CreateScreen) {
        navigation.dispatch(StackActions.push(tab));
      } else {
        navigation.dispatch(TabActions.jumpTo(tab));
        setTab(tab);
      }
    },
    [navigation],
  );

  return (
    <View style={containerStyle}>
      <View style={backgroundStyle} />
      {bottomTabItems.map(item => (
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

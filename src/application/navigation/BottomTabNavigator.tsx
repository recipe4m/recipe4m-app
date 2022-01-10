import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from '../../presentation/common/component/BottomTabBar';
import React from 'react';
import { ScreenName } from './ScreenName';
import ShortcutScreen from '@presentation/shortcut/ui/ShortcutScreen';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  const TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar {...props} insets={insets} />,
    [insets],
  );

  return (
    <Tab.Navigator tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ScreenName.ShortcutScreen} component={ShortcutScreen} />
      <Tab.Screen name={ScreenName.RecipeScreen} component={ShortcutScreen} />
      <Tab.Screen name={ScreenName.CreateScreen} component={ShortcutScreen} />
      <Tab.Screen name={ScreenName.NoteScreen} component={ShortcutScreen} />
      <Tab.Screen name={ScreenName.ProfileScreen} component={ShortcutScreen} />
    </Tab.Navigator>
  );
}

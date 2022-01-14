import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from '../../presentation/common/component/bottom-tab/BottomTabBar';
import ProfileScreen from '@presentation/profile/ui/ProfileScreen';
import React from 'react';
import { RootState } from '@reducer';
import { ScreenName } from './ScreenName';
import ShortcutScreen from '@presentation/shortcut/ui/ShortcutScreen';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

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
      <Tab.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

import { Pressable, Text, View } from 'react-native';

import BottomTabBar from './component/BottomTabBar';
import React from 'react';
import { ScreenName } from './ScreenName';
import ShortcutScreen from '@presentation/shortcut/ui/ShortcutScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function TabComponent() {
  const navigation = useNavigation();

  const handlePressPush = () => {
    navigation.navigate('StackComponent', {});
  };

  return (
    <View>
      <Text>TabComponent</Text>
      <Pressable onPress={handlePressPush}>
        <Text>I'm pressable!</Text>
      </Pressable>
    </View>
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  const TabBar = useCallback(() => <BottomTabBar insets={insets} />, [insets]);

  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name={ScreenName.ShortcutScreen} component={ShortcutScreen} />
      <Tab.Screen name="Search" component={TabComponent} />
      <Tab.Screen name="Recipe" component={TabComponent} />
      <Tab.Screen name="Profile" component={TabComponent} />
    </Tab.Navigator>
  );
}

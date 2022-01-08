import { Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabComponent() {
  return (
    <View>
      <Text>TabComponent</Text>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TabComponent} />
      <Tab.Screen name="Search" component={TabComponent} />
      <Tab.Screen name="Recipe" component={TabComponent} />
      <Tab.Screen name="Profile" component={TabComponent} />
    </Tab.Navigator>
  );
}

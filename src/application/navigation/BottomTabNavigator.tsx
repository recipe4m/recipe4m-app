import { Pressable, Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

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
  return (
    <Tab.Navigator>
      <Tab.Screen name="Kitchen" component={TabComponent} />
      <Tab.Screen name="Search" component={TabComponent} />
      <Tab.Screen name="Recipe" component={TabComponent} />
      <Tab.Screen name="Profile" component={TabComponent} />
    </Tab.Navigator>
  );
}

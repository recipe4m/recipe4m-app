import { Pressable, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import BottomTabNavigator from './BottomTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StackComponent() {
  const navigationState = useNavigationState(state => state);
  const navigation = useNavigation();

  console.log(navigationState);

  const handlePressPush = () => {
    navigation.push('StackComponent');
  };

  useEffect(() => {
    console.log('attach');

    return () => {
      console.log('detach');
    };
  }, []);

  return (
    <View>
      <Text>TabComponent</Text>
      <Pressable onPress={handlePressPush}>
        <Text>Stack</Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="StackComponent" component={StackComponent} />
    </Stack.Navigator>
  );
}

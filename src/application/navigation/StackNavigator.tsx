import BottomTabNavigator from './BottomTabNavigator';
import CreateScreen from '@presentation/create/ui/CreateScreen';
import React from 'react';
import { ScreenName } from './ScreenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenName.BottomTabNavigator}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.CreateScreen}
        component={CreateScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

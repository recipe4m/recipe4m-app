import BottomTabNavigator from './BottomTabNavigator';
import CreateScreen from '@presentation/create/ui/CreateScreen';
import React from 'react';
import TimerCardScreen from '@presentation/timer-card/ui/TimerCardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={BottomTabNavigator.name}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CreateScreen.name}
        component={CreateScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name={TimerCardScreen.name}
        component={TimerCardScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

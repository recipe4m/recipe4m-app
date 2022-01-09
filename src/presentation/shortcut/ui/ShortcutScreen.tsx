import BottomTabView from '@common/component/BottomTabView';
import Heading from '@common/component/Heading';
import React from 'react';
import { Text } from 'react-native-svg';
import TimerCard from './component/TimerCard';

export default function ShortcutScreen() {
  return (
    <BottomTabView>
      <Heading style={{ marginLeft: 18 }}>Shortcut</Heading>
      <Text>Hello</Text>
      <TimerCard />
    </BottomTabView>
  );
}

import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import Heading from '@common/component/text/Heading';
import React from 'react';
import TimerCard from './component/TimerCard';

export default function ShortcutScreen() {
  return (
    <BottomTabView>
      <Heading style={{ marginLeft: 18 }}>Shortcut</Heading>
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
      <TimerCard />
    </BottomTabView>
  );
}

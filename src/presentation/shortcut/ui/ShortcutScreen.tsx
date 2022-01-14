import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import React from 'react';
import TimerCard from './component/TimerCard';

export default function ShortcutScreen() {
  return (
    <BottomTabView>
      <TimerCard />
    </BottomTabView>
  );
}

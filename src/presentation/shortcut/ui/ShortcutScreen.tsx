import React, { useCallback, useState } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import HeaderComponent from './component/HeaderComponent';
import TimerCard from './component/TimerCard';
import { View } from 'react-native';
import { useTimerCards } from '../hook/useTimerCards';

export default function ShortcutScreen() {
  const { timerCards } = useTimerCards();

  return (
    <BottomTabView HeaderComponent={<HeaderComponent />}>
      {timerCards.map(timerCard => (
        <TimerCard key={timerCard.id} item={timerCard} />
      ))}
    </BottomTabView>
  );
}

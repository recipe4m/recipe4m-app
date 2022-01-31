import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import React from 'react';
import TimerCard from './component/TimerCard';
import { useTimerCards } from '../hook/useTimerCards';

export default function ShortcutScreen() {
  const { timerCards } = useTimerCards();

  return (
    <BottomTabView>
      {timerCards.map(timerCard => (
        <TimerCard key={timerCard.id} item={timerCard} />
      ))}
    </BottomTabView>
  );
}

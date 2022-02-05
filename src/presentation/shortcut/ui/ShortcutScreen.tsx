import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import HeaderComponent from './component/HeaderComponent';
import React from 'react';
import TimerCard from './component/TimerCard';
import { useTimerCards } from '../hook/useTimerCards';

export default function ShortcutScreen() {
  const { timerCards, handlePressRemove } = useTimerCards();

  return (
    <BottomTabView HeaderComponent={<HeaderComponent />}>
      {timerCards.map(timerCard => (
        <TimerCard
          key={timerCard.id}
          item={timerCard}
          onPressRemove={handlePressRemove}
        />
      ))}
    </BottomTabView>
  );
}

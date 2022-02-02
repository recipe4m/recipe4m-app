import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import HeaderComponent from './component/HeaderComponent';
import React from 'react';
import TimerCard from './component/TimerCard';
import { View } from 'react-native';
import { useTimerCards } from '../hook/useTimerCards';

export default function ShortcutScreen() {
  const { timerCards } = useTimerCards();

  return (
    <BottomTabView HeaderComponent={<HeaderComponent />}>
      {timerCards.map(timerCard => (
        <View key={timerCard.id}>
          <TimerCard item={timerCard} />
          <TimerCard item={timerCard} />
          <TimerCard item={timerCard} />
          <TimerCard item={timerCard} />
          <TimerCard item={timerCard} />
        </View>
      ))}
    </BottomTabView>
  );
}

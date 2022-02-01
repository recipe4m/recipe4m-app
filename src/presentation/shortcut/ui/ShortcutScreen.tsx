import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import Heading from '@common/component/text/Heading';
import React from 'react';
import { Text } from 'react-native-svg';
import TimerCard from './component/TimerCard';
import { View } from 'react-native';
import { useTimerCards } from '../hook/useTimerCards';

export default function ShortcutScreen() {
  const { timerCards } = useTimerCards();

  return (
    <BottomTabView>
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

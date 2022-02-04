import { TimerCard, removeTimerCard } from '@reducer/TimerCard';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@reducer';
import { useCallback } from 'react';

export function useTimerCards() {
  const { timerCards } = useSelector(({ timerCard }: RootState) => timerCard);
  const dispatch = useDispatch();

  const handlePressRemove = useCallback(
    (timerCard: TimerCard) => {
      dispatch(removeTimerCard(timerCard.id));
    },
    [timerCards],
  );

  return {
    timerCards,
    handlePressRemove,
  };
}

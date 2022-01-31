import { RootState } from '@reducer';
import { useSelector } from 'react-redux';

export function useTimerCards() {
  const { timerCards } = useSelector(({ timerCard }: RootState) => timerCard);

  return {
    timerCards,
  };
}

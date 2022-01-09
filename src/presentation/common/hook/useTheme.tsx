import { StoreState } from '@application/store';
import { ThemeState } from '@reducer/theme';
import { useSelector } from 'react-redux';

export default function useTheme() {
  return useSelector<StoreState, ThemeState>(
    state => state.theme,
    (left, right) => left.theme === right.theme,
  );
}

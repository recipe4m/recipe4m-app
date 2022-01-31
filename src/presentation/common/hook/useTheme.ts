import { RootState } from '@reducer';
import { ThemeState } from '@reducer/Theme';
import { useSelector } from 'react-redux';

export default function useTheme() {
  return useSelector<RootState, ThemeState>(
    state => state.theme,
    (left, right) => left.theme === right.theme,
  );
}

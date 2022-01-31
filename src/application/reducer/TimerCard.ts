import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

import { getRandomId } from '@lib/Random';

export interface TimerCard {
  id: string;
  title: string;
  description: string;
  timeout: number;
}

export interface UpdateTimerCard extends Omit<Partial<TimerCard>, 'id'> {
  id: string;
}

export interface TimerCardState {
  timerCards: TimerCard[];
}

export interface TimerCardReducer extends SliceCaseReducers<TimerCardState> {
  addTimerCard: (
    state: TimerCardState,
    action: PayloadAction<TimerCard>,
  ) => void;
  removeTimerCard: (
    state: TimerCardState,
    action: PayloadAction<string>,
  ) => void;
  updateTimerCard: (
    state: TimerCardState,
    action: PayloadAction<Partial<UpdateTimerCard>>,
  ) => void;
}

export const timerCardSlice = createSlice<
  TimerCardState,
  TimerCardReducer,
  'timerCard'
>({
  name: 'timerCard',
  initialState: {
    timerCards: [
      {
        id: getRandomId(),
        title: '라면',
        description: '라면이 맛있어 지는 시간',
        timeout: 4 * 60 * 1000,
      },
    ],
  },
  reducers: {
    addTimerCard(state, action) {
      state.timerCards.push(action.payload as TimerCard);
    },
    removeTimerCard(state, action) {
      state.timerCards = state.timerCards.filter(
        timerCard => timerCard.id !== action.payload,
      );
    },
    updateTimerCard(state, action) {
      const index = state.timerCards.findIndex(
        timerCard => timerCard.id === action.payload.id,
      );
      if (index !== -1) {
        state.timerCards[index] = {
          ...state.timerCards[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addTimerCard, removeTimerCard, UpdateTimerCard } =
  timerCardSlice.actions;

export default timerCardSlice.reducer;

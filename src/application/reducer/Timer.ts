import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

import { PushNotificationScheduleObject } from 'react-native-push-notification';
import { Status } from '@model/Timer';

export interface NotificationObject
  extends Omit<PushNotificationScheduleObject, 'id'> {
  id: string;
}

export interface Timer {
  id: string;
  status: Status;
  timeout: number;
  remainTimeout?: number;
  date?: Date;
  notificationObject: NotificationObject;
}

export interface TimerState {
  timers: Timer[];
}

export interface TimerReducer extends SliceCaseReducers<TimerState> {
  addTimer: (state: TimerState, action: PayloadAction<Timer>) => void;
  removeTimer: (state: TimerState, action: PayloadAction<Timer>) => void;
  setTimer: (state: TimerState, action: PayloadAction<Timer>) => void;
  setTimers: (state: TimerState, action: PayloadAction<Timer[]>) => void;
}

export const timerSlice = createSlice<TimerState, TimerReducer, 'timer'>({
  name: 'timer',
  initialState: {
    timers: [],
  },
  reducers: {
    addTimer(state, action) {
      state.timers.push(action.payload as Timer);
    },
    removeTimer(state, action) {
      const timerId = action.payload.id;
      state.timers = state.timers.filter(timer => timer.id !== timerId);
    },
    setTimer(state, action) {
      const timerId = action.payload.id;
      const timerIndex = state.timers.findIndex(timer => timer.id === timerId);
      if (timerIndex !== -1) state.timers[timerIndex] = action.payload;
    },
    setTimers(state, action) {
      state.timers = action.payload;
    },
  },
});

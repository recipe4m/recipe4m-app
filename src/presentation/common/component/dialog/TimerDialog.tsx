/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import TimeList, { TimeListRef } from './TimeList';
import { convertHMSToValue, convertValueToHMS } from '@lib/DateTime';

import { ColorPalette } from '@style/ColorPalette';
import { DefaultOptions } from './interface';
import DialogView from './DialogView';
import FullButton from '../button/FullButton';
import Heading from '../text/Heading';
import { ITEM_HEIGHT } from './TimeListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Visible } from './DimmedView';
import { addTimer } from '@reducer/Timer';
import { getRandomId } from '@lib/Random';
import timerUseCase from '@useCase/TimerUseCase';
import { useDispatch } from 'react-redux';

export interface TimerDialogOptions extends DefaultOptions {
  time: number;
  message: string;
}

interface TimerDialogProps {
  visible: Visible;
  close: () => void;
  options: TimerDialogOptions;
}

interface TimeoutStateRef {
  hour: number;
  minute: number;
  second: number;
}

export default function TimerDialog({
  visible,
  close,
  options,
}: TimerDialogProps) {
  const timeoutRef = useRef<TimeoutStateRef>(convertValueToHMS(options.time));
  const hourRef = useRef<TimeListRef>(null);
  const minuteRef = useRef<TimeListRef>(null);
  const secondRef = useRef<TimeListRef>(null);

  const dispatch = useDispatch();

  const { hour, minute, second } = useMemo(() => {
    return convertValueToHMS(options.time);
  }, [options.time]);

  const handlePressStart = useCallback(() => {
    const timeout = convertHMSToValue(timeoutRef.current);
    const id = getRandomId();
    const date = new Date(Date.now() + timeout);
    const notificationObject = {
      id,
      date,
      message: options.message,
    };
    dispatch(
      addTimer({
        id,
        status: 'READY',
        timeout,
        remainTimeout: timeout,
        date,
        notificationObject,
      }),
    );
    close();
  }, []);

  const handleChangeHour = useCallback((value: number) => {
    timeoutRef.current.hour = value;
  }, []);

  const handleChangeMinute = useCallback((value: number) => {
    if (timeoutRef.current.minute === 59 && value === 0) {
      hourRef.current?.moveToNext();
    } else if (timeoutRef.current.minute === 0 && value === 59) {
      hourRef.current?.moveToPrev();
    }
    timeoutRef.current.minute = value;
  }, []);

  const handleChangeSecond = useCallback((value: number) => {
    if (timeoutRef.current.second === 59 && value === 0) {
      minuteRef.current?.moveToNext();
    } else if (timeoutRef.current.second === 0 && value === 59) {
      minuteRef.current?.moveToPrev();
    }
    timeoutRef.current.second = value;
  }, []);

  return (
    <DialogView visible={visible} options={options}>
      <Icon
        style={styles.icon}
        name="timer"
        size={30}
        color={ColorPalette.ORANGE_100}
      />
      <View style={styles.timeListWrapper}>
        <TimeList
          ref={hourRef}
          initialValue={hour}
          range={100}
          onChangeValue={handleChangeHour}
        />
        <Heading style={styles.colon}>:</Heading>
        <TimeList
          ref={minuteRef}
          initialValue={minute}
          onChangeValue={handleChangeMinute}
        />
        <Heading style={styles.colon}>:</Heading>
        <TimeList
          ref={secondRef}
          initialValue={second}
          onChangeValue={handleChangeSecond}
        />
      </View>
      <FullButton onPress={handlePressStart}>Start</FullButton>
    </DialogView>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 18,
    left: 18,
  },
  timeListWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 50,
    padding: 18,
    height: ITEM_HEIGHT * 5,
  },
  colon: {
    marginHorizontal: 10,
  },
});

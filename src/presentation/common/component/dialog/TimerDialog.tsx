/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorPalette } from '@style/ColorPalette';
import { DefaultOptions } from './interface';
import DialogView from './DialogView';
import FullButton from '../button/FullButton';
import Heading from '../text/Heading';
import { ITEM_HEIGHT } from './TimeListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimeList from './TimeList';
import { Visible } from './DimmedView';
import { addTimer } from '@reducer/Timer';
import { getRandomId } from '@lib/random';
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

export default function TimerDialog({
  visible,
  close,
  options,
}: TimerDialogProps) {
  const timeoutRef = useRef<number>(options.time);
  const dispatch = useDispatch();

  const { hour, minute, second } = useMemo(() => {
    const time = options.time;
    let remain = time / 1000;
    const hour = Math.floor(remain / 3600);
    remain = remain % 3600;
    const minute = Math.floor(remain / 60);
    const second = remain % 60;
    return { hour, minute, second };
  }, [options.time]);

  const handlePressStart = useCallback(() => {
    const timeout = timeoutRef.current;
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

  return (
    <DialogView visible={visible} options={options}>
      <Icon
        style={styles.icon}
        name="timer"
        size={30}
        color={ColorPalette.ORANGE_100}
      />
      <View style={styles.timeListWrapper}>
        <TimeList initialValue={hour} range={100} />
        <Heading style={styles.colon}>:</Heading>
        <TimeList initialValue={minute} />
        <Heading style={styles.colon}>:</Heading>
        <TimeList initialValue={second} />
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

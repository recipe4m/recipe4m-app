/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import timerUseCase from '@useCase/TimerUseCase';

export interface TimerDialogOptions extends DefaultOptions {
  time: number;
  message: string;
}

interface TimerDialogProps {
  visible: Visible;
  options: TimerDialogOptions;
}

export default function TimerDialog({ visible, options }: TimerDialogProps) {
  const [time, setTime] = useState<number>(options.time);

  const { hour, minute, second } = useMemo(() => {
    let remain = time / 1000;
    const hour = Math.floor(remain / 3600);
    remain = remain % 3600;
    const minute = Math.floor(remain / 60);
    const second = remain % 60;
    return { hour, minute, second };
  }, [time]);

  const handlePressStart = useCallback(() => {
    const timer = timerUseCase.addTimer({
      timeout: time,
      notificationObject: {
        date: new Date(Date.now() + time),
        message: options.message,
      },
    });

    console.log(timer);
  }, [time]);

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

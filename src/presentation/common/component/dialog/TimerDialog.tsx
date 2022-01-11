/* eslint-disable @typescript-eslint/no-shadow */
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorPalette } from '@style/ColorPalette';
import { DefaultOptions } from './interface';
import DialogView from './DialogView';
import FullButton from '../button/FullButton';
import Heading from '../text/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimeList from './TimeList';
import { Visible } from './DimmedView';

export interface TimerDialogOptions extends DefaultOptions {
  time: number;
}

interface TimerDialogProps {
  visible: Visible;
  options: TimerDialogOptions;
}

export default function TimerDialog({ visible, options }: TimerDialogProps) {
  const [time, setTime] = useState<number>(options.time);

  const { h, m, s } = useMemo(() => {
    let remain = time / 1000;
    const h = Math.floor(remain / 3600);
    remain = remain % 3600;
    const m = `${Math.floor(remain / 60)}`.padStart(2, '0');
    const s = `${remain % 60}`.padStart(2, '0');
    return { h, m, s };
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
        <TimeList type="hour" />
        <Heading>:</Heading>
        <TimeList type="minute" />
        <Heading>:</Heading>
        <TimeList type="second" />
      </View>
      <FullButton>Start</FullButton>
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
    marginTop: 50,
    padding: 18,
  },
});

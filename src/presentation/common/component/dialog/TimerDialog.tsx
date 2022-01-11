/* eslint-disable @typescript-eslint/no-shadow */
import { ColorPalette } from '@style/ColorPalette';
import React, { useMemo, useState } from 'react';
import DialogView from './DialogView';
import { DefaultOptions } from './interface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
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
    <DialogView
      visible={visible}
      layout={options.layout}
      source={options.source}>
      <Icon
        style={styles.icon}
        name="timer"
        size={30}
        color={ColorPalette.BLACK}
      />
    </DialogView>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 18,
    left: 18,
  },
  timerWrapper: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
});

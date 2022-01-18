import CircularProgressBar from '../../common/component/CircularProgressBar';
import FloatingTimerView from './FloatingTimerView';
import React from 'react';
import { Size } from '@style/Size';
import { StyleSheet } from 'react-native';
import useTimer from '../hook/useTimer';

interface FloatingTimerProps {}

export default function FloatingTimer({}: FloatingTimerProps) {
  const timer = useTimer();

  return (
    <FloatingTimerView style={[styles.container]}>
      <CircularProgressBar progress={0.7} />
    </FloatingTimerView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: Size.BOTTOM_TAB_BAR_HEIGHT,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

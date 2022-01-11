import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';

import Animated from 'react-native-reanimated';
/* eslint-disable @typescript-eslint/no-shadow */
import { ColorPalette } from '@style/ColorPalette';
import { DefaultOptions } from './interface';
import DialogView from './DialogView';
import FullButton from '../button/FullButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <View style={styles.timeWrapper}>
        <Animated.ScrollView
          onScroll={() => console.log('here')}
          pagingEnabled
          scrollEventThrottle={16}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            time => (
              <View onStartShouldSetResponder={() => true}>
                <Text key={time} style={{ flex: 1, height: 40 }}>
                  {time}
                </Text>
              </View>
            ),
          )}
        </Animated.ScrollView>
        <Text>:</Text>
        <FlatList
          style={{ height: '100%', width: 50 }}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          pagingEnabled
          renderItem={({ item }) => (
            <View onStartShouldSetResponder={() => true}>
              <Text>{item}</Text>
            </View>
          )}
          scrollEnabled
        />
        <Text>:</Text>
        <FlatList
          style={{ height: '100%', width: 50 }}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          renderItem={({ item }) => (
            <View onStartShouldSetResponder={() => true}>
              <Text>{item}</Text>
            </View>
          )}
          scrollEnabled
        />
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
  timeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    alignSelf: 'center',
    height: 100,
    padding: 18,
  },
});

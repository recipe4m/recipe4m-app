import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { ColorPalette } from '@style/ColorPalette';
import Heading from '@common/component/text/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TimerCard as Item } from '@reducer/TimerCard';
import Medium from '@common/component/text/Medium';
import Regular from '@common/component/text/Regular';
import TimerCardView from './TimerCardView';
import { convertValueToHMS } from '@lib/DateTime';
import { useDialog } from '@application/context/DialogContext';

export interface TimerCardProps {
  item: Item;
}

export default function TimerCard({
  item: { title, description, timeout },
}: TimerCardProps) {
  const timerCardRef = useRef<View>(null);

  const { openTimer } = useDialog();

  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePressCard = useCallback(() => {
    timerCardRef.current?.measureInWindow((x, y, width, height) => {
      const handleClose = () => {
        opacity.value = 1;
      };

      const handleOpen = () => {
        opacity.value = 0;
      };

      openTimer({
        type: 'timer',
        time: timeout,
        layout: { x, y, width, height },
        source: require('@asset/image/ramen.jpg'),
        onOpen: handleOpen,
        onClose: handleClose,
        message: description,
      });
    });
  }, [opacity, openTimer]);

  const time = useMemo(() => {
    let time = '';
    const { hour, minute, second } = convertValueToHMS(timeout);
    if (hour > 0) time += hour + ':';
    time += `${minute}`.padStart(2, '0') + ':';
    time += `${second}`.padStart(2, '0');

    return time;
  }, [timeout]);

  return (
    <TimerCardView
      ref={timerCardRef}
      style={[styles.container, animatedStyle]}
      source={require('@asset/image/ramen.jpg')}
      onPress={handlePressCard}>
      <Icon
        style={styles.categoryIcon}
        name="timer"
        size={30}
        color={ColorPalette.WHITE}
      />
      <View style={styles.summaryWrapper}>
        <Heading style={styles.title}>{title}</Heading>
        <Regular style={styles.description} numberOfLines={2}>
          {description}
        </Regular>
      </View>
      <View style={styles.timerWrapper}>
        <View style={styles.timerInnerWrapper}>
          <Icon name="query-builder" color={ColorPalette.WHITE} size={18} />
          <Medium style={styles.time}>{time}</Medium>
        </View>
      </View>
    </TimerCardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  summaryWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: ColorPalette.WHITE,
    marginBottom: 10,
  },
  description: {
    color: ColorPalette.GRAY_200,
  },
  timerWrapper: {
    justifyContent: 'flex-end',
  },
  timerInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 4,
    color: ColorPalette.WHITE,
  },
  categoryIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
  },
});

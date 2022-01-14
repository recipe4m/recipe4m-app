import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { ColorPalette } from '@style/ColorPalette';
import Heading from '@common/component/text/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Medium from '@common/component/text/Medium';
import Regular from '@common/component/text/Regular';
import TimerCardView from './TimerCardView';
import { useDialog } from '@application/context/DialogContext';

export default function TimerCard() {
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
        time: 4 * 60 * 1000,
        layout: { x, y, width, height },
        source: require('@asset/image/ramen.jpg'),
        onOpen: handleOpen,
        onClose: handleClose,
      });
    });
  }, [opacity, openTimer]);

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
        <Heading style={styles.title}>라면</Heading>
        <Regular style={styles.guide} numberOfLines={2}>
          라면이 맛있어 지는 시간
        </Regular>
      </View>
      <View style={styles.timerWrapper}>
        <View style={styles.timerInnerWrapper}>
          <Icon name="query-builder" color={ColorPalette.WHITE} size={18} />
          <Medium style={styles.time}>04:00</Medium>
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
  guide: {
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

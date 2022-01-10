import Heading from '@common/component/text/Heading';
import Medium from '@common/component/text/Medium';
import React from 'react';
import Regular from '@common/component/text/Regular';
import TimerCardView from './TimerCardView';
import { Pressable, StyleSheet, View } from 'react-native';
import { ColorPalette } from '@style/ColorPalette';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDialog } from '@application/context/DialogContext';

export default function TimerCard() {
  const { openTimer } = useDialog();

  return (
    <Pressable
      onPress={() => {
        openTimer(100);
      }}>
      <TimerCardView
        style={styles.container}
        source={require('@asset/image/ramen.jpg')}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    left: 18,
    top: 18,
  },
});

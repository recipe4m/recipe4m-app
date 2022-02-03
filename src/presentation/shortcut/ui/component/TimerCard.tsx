import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { ColorPalette } from '@style/ColorPalette';
import Heading from '@common/component/text/Heading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TimerCard as Item } from '@reducer/TimerCard';
import Medium from '@common/component/text/Medium';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Regular from '@common/component/text/Regular';
import TimerCardView from './TimerCardView';
import { convertValueToHMS } from '@lib/DateTime';
import { useDialog } from '@application/context/DialogContext';

export interface TimerCardProps {
  item: Item;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TimerCard({
  item: { title, description, timeout },
}: TimerCardProps) {
  const timerCardRef = useRef<View>(null);

  const { openTimer } = useDialog();

  const base = useSharedValue<number>(0);
  const translateX = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [-101, -100, 0, 1],
          [-100, -100, 0, 0],
        ),
      },
    ],
  }));

  const animatedRemoveButtonStyle = useAnimatedStyle(() => ({
    width: interpolate(translateX.value, [-99, -98, -18, -17], [80, 80, 0, 0]),
    height: interpolate(translateX.value, [-99, -98, -18, -17], [80, 80, 0, 0]),
  }));

  const animatedRemoveItemWrapperStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-98, -50], [1, 0]),
  }));

  const handlePressCard = useCallback(() => {
    if (translateX.value !== 0) {
      translateX.value = withTiming(0, { duration: 200 });
    } else {
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
    }
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <PanGestureHandler
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state === 2) {
            base.value = translateX.value;
          } else if (state === 5) {
            if (translateX.value < -100) {
              base.value = -100;
            } else {
              translateX.value = withSpring(0);
            }
          }
        }}
        onGestureEvent={({ nativeEvent: { translationX } }) => {
          translateX.value = base.value + translationX;
        }}
        activeOffsetX={[-10, 10]}>
        <TimerCardView
          ref={timerCardRef}
          style={[styles.container, animatedStyle]}
          source={require('@asset/image/ramen.jpg')}
          onPress={handlePressCard}
          onLongPress={() => {
            translateX.value = withTiming(translateX.value === 0 ? -100 : 0, {
              duration: 100,
            });
          }}>
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
      </PanGestureHandler>
      <AnimatedPressable
        style={[styles.removeButtonWrapper, animatedRemoveButtonStyle]}>
        <Animated.View style={animatedRemoveItemWrapperStyle}>
          <Icon name="delete-forever" size={35} color={ColorPalette.WHITE} />
        </Animated.View>
      </AnimatedPressable>
    </View>
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
  removeButtonWrapper: {
    position: 'absolute',
    right: 18,
    backgroundColor: ColorPalette.RED_700,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TimeListItem, { ITEM_HEIGHT } from './TimeListItem';

interface TimeListProps {
  initialValue: number;
}

const THREADHOLD = ITEM_HEIGHT / 2;

export default function TimeList({ initialValue }: TimeListProps) {
  const start = useSharedValue<number>(0);
  const diff = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const [value, setValue] = useState<number>(initialValue);

  const handleBegan = useCallback(() => {
    start.value = value;
    diff.value = 0;
  }, [diff, start, value]);

  const handleGestureEvent = useCallback(
    ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
      const { translationY } = nativeEvent;
      const _diff = Math.floor((translationY + THREADHOLD) / ITEM_HEIGHT);
      if (_diff !== diff.value) {
        diff.value = _diff;
        let _value = start.value - _diff;
        if (_value < 0) _value += 60;
        else if (_value >= 60) _value -= 60;
        setValue(_value);
      }
      translateY.value = translationY - _diff * ITEM_HEIGHT;
    },
    [diff, start, translateY],
  );

  const handleEnded = useCallback(() => {
    translateY.value = withTiming(0, { duration: 100 });
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: -ITEM_HEIGHT,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView onStartShouldSetResponder={() => true}>
      <PanGestureHandler
        onBegan={handleBegan}
        onGestureEvent={handleGestureEvent}
        onEnded={handleEnded}>
        <View style={styles.container}>
          <View style={styles.selectedArea} />
          <Animated.View style={[styles.list, animatedStyle]}>
            {Array.from({ length: 7 }, (_, i) => {
              let _value = value + i - 3;
              if (_value < 0) _value += 60;
              else if (_value >= 60) _value -= 60;

              return <TimeListItem key={_value} value={_value} />;
            })}
          </Animated.View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 250,
  },
  selectedArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  list: {
    alignSelf: 'center',
  },
});

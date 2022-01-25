import Animated, {
  runOnJS,
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
import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import TimeListItem, { ITEM_HEIGHT } from './TimeListItem';

import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { convertHexToRGBA } from '@application/util/color';
import useTheme from '@common/hook/useTheme';

export interface TimeListProps {
  initialValue: number;
  /**
   * 60 경우 0 ~ 59까지 숫자 표현
   */
  range?: number;
  onChangeValue?: (value: number) => void;
}

export interface TimeListRef {
  moveToNext: () => void;
  moveToPrev: () => void;
}

interface TimeListStateRef {
  baseValue: number;
  diff: number;
  baseIndex: number;
  index: number;
}

const THREADHOLD = ITEM_HEIGHT / 2;

function TimeList(
  { initialValue, range = 60, onChangeValue }: TimeListProps,
  ref: ForwardedRef<TimeListRef>,
) {
  const eventRef = useRef({ initialized: false });
  const timeListState = useRef<TimeListStateRef>({
    baseValue: 0,
    diff: 0,
    baseIndex: 3,
    index: 3,
  });

  const { colors } = useTheme();

  const translateY = useSharedValue<number>(0);

  const [value, setValue] = useState<number>(initialValue);

  const data = useMemo(() => {
    const { index } = timeListState.current;

    const _values = Array.from({ length: 7 }, (_, i) => {
      let _value = value + i - 3;
      if (_value < 0) _value += range;
      else if (_value >= range) _value -= range;

      const _index = index - 3 + i;

      return { value: _value, index: _index };
    });

    return _values;
  }, [value]);

  const gradientColors = useMemo(
    () => [
      colors.DIALOG_BACKGROUND,
      convertHexToRGBA(colors.DIALOG_BACKGROUND, 0),
    ],
    [colors],
  );

  const handleBegan = useCallback(() => {
    timeListState.current.baseValue = value;
    timeListState.current.diff = 0;
    timeListState.current.baseIndex = timeListState.current.index;
  }, [value]);

  const handleGestureEvent = useCallback(
    ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
      const { baseValue, baseIndex, diff } = timeListState.current;
      const { translationY } = nativeEvent;
      translateY.value = (3 - baseIndex) * ITEM_HEIGHT + translationY;
      const _diff = Math.floor((translationY + THREADHOLD) / ITEM_HEIGHT);
      if (_diff !== diff) {
        timeListState.current.index += diff - _diff;
        timeListState.current.diff = _diff;
        let _value = baseValue - _diff;
        if (_value < 0) _value += range;
        else if (_value >= range) _value -= range;

        setValue(_value);
      }
    },
    [translateY],
  );

  const handleEnded = useCallback(() => {
    const { index } = timeListState.current;

    translateY.value = withTiming((3 - index) * ITEM_HEIGHT, {
      duration: 100,
    });
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: -1 * ITEM_HEIGHT,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (!eventRef.current.initialized) {
      eventRef.current.initialized = true;
    } else {
      ReactNativeHapticFeedback.trigger('selection', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
      if (onChangeValue) onChangeValue(value);
    }
  }, [onChangeValue, value]);

  useEffect(() => {
    if (ref as MutableRefObject<TimeListRef>) {
      (ref as MutableRefObject<TimeListRef>).current = {
        moveToNext: () => {
          translateY.value = withTiming(translateY.value - ITEM_HEIGHT, {
            duration: 100,
          });
          let _value = value + 1;
          if (_value >= range) _value -= range;
          setValue(_value);
        },
        moveToPrev: () => {
          translateY.value = withTiming(translateY.value + ITEM_HEIGHT, {
            duration: 100,
          });
          let _value = value - 1;
          if (_value < 0) _value += range;
          setValue(_value);
        },
      };
    }
  }, [ref, value]);

  return (
    <GestureHandlerRootView onStartShouldSetResponder={() => true}>
      <PanGestureHandler
        onBegan={handleBegan}
        onGestureEvent={handleGestureEvent}
        onEnded={handleEnded}>
        <View style={styles.container}>
          <Animated.View style={[styles.list, animatedStyle]}>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {data.map(({ value, index }) => (
              <TimeListItem key={value} value={value} index={index} />
            ))}
          </Animated.View>
          <View style={styles.selectedArea} />
          <LinearGradient
            style={[styles.gradient, styles.topGradient]}
            colors={[gradientColors[0], gradientColors[1]]}
          />
          <LinearGradient
            style={[styles.gradient, styles.bottomGradient]}
            colors={[gradientColors[1], gradientColors[0]]}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: ITEM_HEIGHT * 5,
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
    width: '100%',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 2,
  },
  topGradient: {
    top: 0,
  },
  bottomGradient: {
    bottom: 0,
  },
});

export default forwardRef(TimeList);

import {
  FlatList,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Medium from '../text/Medium';
import { NativeScrollEvent } from 'react-native';
import { convertHexToRGBA } from '@application/util/color';
import useTheme from '@common/hook/useTheme';

interface ScrollStateRef {
  offset: number;
  velocity: number;
  timestamp: number;
  scrolling: boolean;
}
interface TimeListProps {
  type: 'hour' | 'minute' | 'second';
  initialValue: number;
}

export const ITEM_HEIGHT = 50;
export const SCROLL_EVENT_THROTTLE = 100;

export default function TimeList({ type }: TimeListProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollStateRef = useRef<ScrollStateRef>({
    offset: 0,
    velocity: 0,
    timestamp: 0,
    scrolling: false,
  });

  const { colors } = useTheme();

  const data = useMemo(() => {
    return type === 'hour'
      ? Array.from({ length: 100 }, (_, i) => i)
      : Array.from({ length: 180 }, (_, i) => i % 60);
  }, [type]);

  const [color1, color2] = useMemo(() => {
    return [
      colors.DIALOG_BACKGROUND,
      convertHexToRGBA(colors.DIALOG_BACKGROUND, 0),
    ];
  }, [colors]);

  const handleScrollAndroid = useCallback(
    ({
      nativeEvent: { contentOffset, velocity },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollStateRef.current.offset = contentOffset.y;

      if (velocity) {
        if (
          Math.abs(scrollStateRef.current.velocity) >= 0.1 &&
          Math.abs(velocity.y) < 0.1
        ) {
          const offset = contentOffset.y + velocity.y;
          const index = Math.floor((offset + ITEM_HEIGHT / 2) / ITEM_HEIGHT);

          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: index * ITEM_HEIGHT,
          });
        }
        scrollStateRef.current.velocity = velocity.y;
      }
    },
    [],
  );

  const handleScrollIOS = useCallback(
    ({
      nativeEvent: { contentOffset, velocity },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollStateRef.current.offset = contentOffset.y;
      if (velocity && Math.abs(velocity.y) < 0.1) {
      }
    },
    [],
  );

  const handleScrollBeginDrag = useCallback(() => {
    scrollStateRef.current.timestamp = new Date().valueOf();
    scrollStateRef.current.velocity = 0;
  }, []);

  const handleStartShouldSetResponder = useCallback(() => true, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View
          style={styles.itemWrapper}
          onStartShouldSetResponder={handleStartShouldSetResponder}>
          <Medium style={styles.itemText}>
            {`${item}`.padStart(2, type === 'hour' ? ' ' : '0')}
          </Medium>
        </View>
      );
    },
    [handleStartShouldSetResponder, type],
  );

  return (
    <View style={styles.container}>
      <View style={styles.selectedArea} />
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        onScroll={
          Platform.OS === 'android' ? handleScrollAndroid : handleScrollIOS
        }
        onScrollBeginDrag={
          Platform.OS === 'android' ? undefined : handleScrollBeginDrag
        }
        onMomentumScrollEnd={() => {
          scrollStateRef.current.scrolling = false;
        }}
        ListHeaderComponent={View}
        ListFooterComponent={View}
        ListHeaderComponentStyle={styles.listHeader}
        ListFooterComponentStyle={styles.listFooter}
      />
      <LinearGradient style={styles.headerGradient} colors={[color1, color2]} />
      <LinearGradient style={styles.footerGradient} colors={[color2, color1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: ITEM_HEIGHT * 5,
  },
  selectedArea: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 28,
  },
  listHeader: {
    height: ITEM_HEIGHT * 2,
  },
  listFooter: {
    height: ITEM_HEIGHT * 2,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
  },
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
  },
});

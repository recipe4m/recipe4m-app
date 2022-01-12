import { FlatList, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Medium from '../text/Medium';
import { NativeScrollEvent } from 'react-native';
import { convertHexToRGBA } from '@application/util/color';
import useTheme from '@common/hook/useTheme';

interface ScrollStateRef {
  offset: number;
  diff: number;
}
interface TimeListProps {
  type: 'hour' | 'minute' | 'second';
  initialValue: number;
}

export const ITEM_HEIGHT = 50;
export const SCROLL_EVENT_THROTTLE = 100;

const HOUR_DATA = Array.from({ length: 10 }, (_, i) => i);
const OTHER_DATA = Array.from({ length: 10 }, (_, i) => i % 60);

export default function TimeList({ type }: TimeListProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollStateRef = useRef<ScrollStateRef>({
    offset: 0,
    diff: 0,
  });

  const { colors } = useTheme();

  const data = useMemo(() => {
    return type === 'hour' ? HOUR_DATA : OTHER_DATA;
  }, [type]);

  const [color1, color2] = useMemo(() => {
    return [
      colors.DIALOG_BACKGROUND,
      convertHexToRGBA(colors.DIALOG_BACKGROUND, 0),
    ];
  }, [colors]);

  const handleScroll = useCallback(
    ({
      nativeEvent: { contentOffset },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log('handleScroll', contentOffset.y);
      scrollStateRef.current.diff =
        contentOffset.y - scrollStateRef.current.offset;
      scrollStateRef.current.offset = contentOffset.y;
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    console.log('handleTouchEnd diff', scrollStateRef.current.diff);
    const offset = scrollStateRef.current.offset;
    let index = Math.floor((offset + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
    if (scrollStateRef.current.diff > 1) index++;
    else if (scrollStateRef.current.diff < -1) index--;
    console.log('handleTouchEnd offset', index * ITEM_HEIGHT);
    flatListRef.current?.scrollToOffset({
      animated: false,
      offset: offset,
    });
    flatListRef.current?.scrollToOffset({
      animated: true,
      offset: index * ITEM_HEIGHT,
    });
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
        onScroll={handleScroll}
        onScrollEndDrag={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        ListHeaderComponent={View}
        ListFooterComponent={View}
        ListHeaderComponentStyle={styles.listHeader}
        ListFooterComponentStyle={styles.listFooter}
        initialNumToRender={5}
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

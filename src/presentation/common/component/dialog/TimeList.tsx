import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';

import Heading from '../text/Heading';
import LinearGradient from 'react-native-linear-gradient';
import { NativeScrollEvent } from 'react-native';
import { convertHexToRGBA } from '@application/util/color';
import useTheme from '@common/hook/useTheme';

interface TimeListProps {
  type: 'hour' | 'minute' | 'second';
}

export default function TimeList({ type }: TimeListProps) {
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();

  const handleStartShouldSetResponder = useCallback(() => true, []);

  const data = useMemo(() => {
    return type === 'hour'
      ? Array.from({ length: 100 }, (_, i) => i)
      : Array.from({ length: 180 }, (_, i) => i % 60);
  }, [type]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View
          style={styles.itemWrapper}
          onStartShouldSetResponder={handleStartShouldSetResponder}>
          <Heading style={styles.itemText}>
            {`${item}`.padStart(2, '0')}
          </Heading>
        </View>
      );
    },
    [handleStartShouldSetResponder],
  );

  const [color1, color2] = useMemo(() => {
    return [
      colors.DIALOG_BACKGROUND,
      convertHexToRGBA(colors.DIALOG_BACKGROUND, 0.1),
    ];
  }, [colors]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={({
          nativeEvent: { contentOffset },
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
          console.log(contentOffset);
        }}
      />
      <LinearGradient style={styles.headerGradient} colors={[color1, color2]} />
      <LinearGradient style={styles.footerGradient} colors={[color2, color1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  itemText: {
    fontSize: 36,
  },
  headerGradient: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 20,
  },
  footerGradient: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 20,
  },
});

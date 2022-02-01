import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Insets,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import React, { PropsWithChildren, useCallback, useMemo } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabViewProps extends ScrollViewProps {}

export default function BottomTabView({
  children,
  style,
  ...props
}: PropsWithChildren<BottomTabViewProps>) {
  const offsetY = useSharedValue<number>(0);
  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    paddingTop: insets.top,
    height: insets.top + 40,
    backgroundColor: 'white',
    opacity: offsetY.value <= 0 ? 0 : 0.3,
  }));

  const insetsStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      minHeight: windowDimensions.height - 50,
      paddingTop: insets.top,
      paddingBottom: Platform.OS === 'ios' ? insets.bottom + 50 : 0,
    }),
    [insets],
  );

  const scrollIndicatorInsets = useMemo<Insets>(
    () => ({
      bottom: insets.bottom ? insets.bottom + 15 : 50,
    }),
    [insets],
  );

  const handleScroll = useCallback(e => {
    offsetY.value = e.nativeEvent.contentOffset.y;
  }, []);

  return (
    <>
      <Animated.ScrollView
        {...props}
        style={[styles.container, style]}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={insetsStyle}>{children}</View>
      </Animated.ScrollView>
      <View style={styles.headerContainer}>
        <Animated.View style={[animatedHeaderStyle]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});

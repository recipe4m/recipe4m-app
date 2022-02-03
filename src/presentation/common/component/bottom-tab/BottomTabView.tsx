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
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';

import { ColorPalette } from '@style/ColorPalette';
import { Size } from '@style/Size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '@common/hook/useTheme';

interface BottomTabViewProps extends ScrollViewProps {
  HeaderComponent?: React.ReactElement;
}

export default function BottomTabView({
  children,
  style,
  HeaderComponent,
  ...props
}: PropsWithChildren<BottomTabViewProps>) {
  const offsetY = useSharedValue<number>(0);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

  const headerContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: insets.top,
      height: insets.top + Size.HEADER_HEIGHT,
      borderColor: colors.HEADER_BORDER,
      backgroundColor: colors.HEADER_BACKGROUND,
      shadowColor: ColorPalette.BLACK,
    }),
    [insets, colors],
  );

  const animatedHeaderContainer = useAnimatedStyle(() => ({
    borderBottomWidth: offsetY.value <= 0 ? 0 : StyleSheet.hairlineWidth,
  }));

  const bodyStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      minHeight: windowDimensions.height - 50,
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

  const handleScroll = useCallback(({ nativeEvent: { contentOffset } }) => {
    offsetY.value = contentOffset.y;
  }, []);

  return (
    <>
      <Animated.View style={[headerContainer, animatedHeaderContainer]}>
        {HeaderComponent}
      </Animated.View>
      <ScrollView
        {...props}
        style={[styles.container, style]}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={bodyStyle}>{children}</View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
  },
});

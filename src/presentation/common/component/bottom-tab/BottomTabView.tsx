import {
  Insets,
  Platform,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabViewProps extends ScrollViewProps {}

export default function BottomTabView({
  children,
  style,
  ...props
}: PropsWithChildren<BottomTabViewProps>) {
  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

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

  return (
    <ScrollView
      {...props}
      style={[styles.container, style]}
      scrollIndicatorInsets={scrollIndicatorInsets}>
      <View style={insetsStyle}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
  },
});

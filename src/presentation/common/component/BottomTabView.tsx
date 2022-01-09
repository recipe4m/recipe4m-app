import {
  Platform,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
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

  const insetsStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: insets.top,
      paddingBottom: Platform.OS === 'ios' ? insets.bottom + 50 : 0,
    }),
    [insets],
  );

  return (
    <ScrollView
      {...props}
      style={[styles.container, style]}
      scrollIndicatorInsets={{
        bottom: insets.bottom ? insets.bottom + 15 : 50,
      }}>
      <View style={insetsStyle}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
  },
});

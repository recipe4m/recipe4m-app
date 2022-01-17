import React, { PropsWithChildren, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ThemeView from './ThemeView';

interface RootViewProps {}

export default function RootView({
  children,
}: PropsWithChildren<RootViewProps>) {
  return (
    <View style={styles.container}>
      <ThemeView>{children}</ThemeView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

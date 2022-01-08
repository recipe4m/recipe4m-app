import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import BottomTabItem from './BottomTabItem';
import { EdgeInsets } from 'react-native-safe-area-context';
import React from 'react';
import { useMemo } from 'react';

interface BottomTabBarProps {
  insets: EdgeInsets;
}

export default function BottomTabBar({ insets }: BottomTabBarProps) {
  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...styles.container,
      height: 50 + insets.bottom,
      paddingBottom: insets.bottom,
    }),
    [insets],
  );

  return (
    <View style={containerStyle}>
      <BottomTabItem label="Shortcut" />
      <BottomTabItem label="Recipe" />
      <BottomTabItem label="Create" />
      <BottomTabItem label="Search" />
      <BottomTabItem label="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: '#aaa',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

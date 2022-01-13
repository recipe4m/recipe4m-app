import React, { useMemo } from 'react';

import Medium from '../text/Medium';
import { StyleSheet } from 'react-native';

export const ITEM_HEIGHT = 50;

interface TimeListItemProps {
  value: number;
}

export default function TimeListItem({ value }: TimeListItemProps) {
  const time = useMemo(() => `${value}`.padStart(2, '0'), [value]);

  return <Medium style={styles.text}>{time}</Medium>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 28,
    height: ITEM_HEIGHT,
    paddingTop: 12,
  },
});

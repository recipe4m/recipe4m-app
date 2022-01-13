import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';

import Medium from '../text/Medium';

export const ITEM_HEIGHT = 50;

interface TimeListItemProps extends TextProps {
  value: number;
  index: number;
}

export default function TimeListItem({
  value,
  index,
  ...props
}: TimeListItemProps) {
  const time = `${value}`.padStart(2, '0');

  const style = { top: index * ITEM_HEIGHT };

  return (
    <Medium {...props} style={[styles.text, style]}>
      {time}
    </Medium>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 28,
    lineHeight: 28,
    height: ITEM_HEIGHT,
    paddingTop: 12,
  },
});

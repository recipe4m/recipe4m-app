import React, { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import useTheme from '@common/hook/useTheme';

interface BottomTabItemLabelProps extends TextProps {
  isSelected: boolean;
}

export default function BottomTabItemLabel({
  isSelected,
  children,
  ...props
}: BottomTabItemLabelProps) {
  const { colors } = useTheme();

  const labelColor = useMemo(
    () =>
      isSelected ? colors.BOTTOM_TAB_LABEL_ACTIVE : colors.BOTTOM_TAB_LABEL,
    [isSelected, colors],
  );

  return (
    <Text {...props} style={[styles.label, { color: labelColor }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 9,
    marginTop: 3,
  },
});

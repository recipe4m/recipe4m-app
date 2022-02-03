import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';

import { Effect } from '@style/Effect';
import useTheme from '@common/hook/useTheme';

export interface HeaderButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
}

export default function HeaderButton({
  children,
  style,
  ...props
}: PropsWithChildren<HeaderButtonProps>) {
  const { colors } = useTheme();

  const labelStyle = useMemo(
    () => ({
      color: colors.HEADER_BUTTON_LABEL_ACTIVE,
    }),
    [colors],
  );

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      activeOpacity={Effect.BUTTON_ACTIVE_OPACITY}
      {...props}>
      {typeof children === 'string' ? (
        <Text style={[styles.label, labelStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: Platform.OS === 'ios' ? 17 : 15,
    fontWeight: '600',
  },
});

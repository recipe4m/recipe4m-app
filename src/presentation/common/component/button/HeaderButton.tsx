import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';

import useTheme from '@common/hook/useTheme';

export interface HeaderButtonProps extends PressableProps {
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
    <Pressable style={[styles.wrapper, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={[styles.label, labelStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
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

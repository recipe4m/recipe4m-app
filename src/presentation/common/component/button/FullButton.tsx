import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';

import Medium from '../text/Medium';
import useTheme from '@common/hook/useTheme';

interface FullButtonProps extends ViewProps {
  onPress?: () => void;
  outline?: boolean;
}

export default function FullButton({
  children,
  style,
  onPress,
  outline = false,
  ...props
}: PropsWithChildren<FullButtonProps>) {
  const { colors } = useTheme();

  const fullButtonStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: outline
        ? colors.BUTTON_OUTLINE_BACKGROUND
        : colors.BUTTON_FILL_BACKGROUND,
    }),
    [colors, outline],
  );

  const fullButtonLabelStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      color: outline ? colors.BUTTON_OUTLINE_LABEL : colors.BUTTON_FILL_LABEL,
    }),
    [colors, outline],
  );

  return (
    <Pressable
      {...props}
      style={[styles.container, fullButtonStyle, style]}
      onPress={onPress}>
      <Medium style={[styles.label, fullButtonLabelStyle]}>{children}</Medium>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 18,
    height: 40,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
  },
});

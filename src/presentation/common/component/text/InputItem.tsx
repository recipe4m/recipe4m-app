import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import Regular from './Regular';
import useTheme from '@common/hook/useTheme';

export interface InputItemProps extends TextInputProps {
  label?: string;
}

export default function InputItem({ label, ...props }: InputItemProps) {
  const { colors } = useTheme();

  const regularStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      fontSize: 14,
      color: colors.REGULAR,
    }),
    [colors],
  );

  return (
    <View style={styles.Wrapper}>
      {label && <Regular style={styles.label}>{label}</Regular>}
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 18,
  },
  label: {
    flex: 1,
  },
  input: {
    flex: 4,
  },
});

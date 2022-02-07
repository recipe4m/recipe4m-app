import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import React from 'react';

export interface InputItemProps extends TextInputProps {}

export default function InputItem({ ...props }: InputItemProps) {
  return (
    <View style={styles.Wrapper}>
      <TextInput {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

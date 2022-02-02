import { Pressable, StyleSheet, View } from 'react-native';

import HeaderButton from '@common/component/button/HeaderButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Medium from '@common/component/text/Medium';
import React from 'react';
import useTheme from '@common/hook/useTheme';

export interface HeaderComponentProps {
  onPressEdit?: () => void;
  onPressAdd?: () => void;
}

export default function HeaderComponent({
  onPressEdit,
  onPressAdd,
}: HeaderComponentProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <HeaderButton onPress={onPressEdit}>편집</HeaderButton>

      <HeaderButton onPress={onPressAdd}>
        <MaterialIcon
          name="add"
          size={22}
          color={colors.HEADER_BUTTON_ICON_ACTIVE}
        />
      </HeaderButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
});

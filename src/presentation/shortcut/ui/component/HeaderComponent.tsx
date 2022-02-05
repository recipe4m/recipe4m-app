import React, { useCallback } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import HeaderButton from '@common/component/button/HeaderButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TimerCardScreen from '@presentation/timer-card/ui/TimerCardScreen';
import useTheme from '@common/hook/useTheme';

export interface HeaderComponentProps {
  onPressEdit?: () => void;
  onPressAdd?: () => void;
}

export default function HeaderComponent({ onPressEdit }: HeaderComponentProps) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handlePressAdd = useCallback(() => {
    navigation.dispatch(StackActions.push(TimerCardScreen.name));
  }, []);

  return (
    <View style={styles.container}>
      <HeaderButton onPress={handlePressAdd}>
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
    justifyContent: 'flex-end',
  },
});

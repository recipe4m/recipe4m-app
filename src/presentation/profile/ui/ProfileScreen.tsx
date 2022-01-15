import { Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

import BottomTabView from '@common/component/bottom-tab/BottomTabView';
import FullButton from '@common/component/button/FullButton';
import Heading from '@common/component/text/Heading';
import LoginScreen from '@presentation/login/ui/LoginScreen';
import Title from '@common/component/text/Title';
import useAuth from '../hook/useAuth';

export default function ProfileScreen() {
  const { isSignedIn, signOut } = useAuth();

  return (
    <BottomTabView>
      {!isSignedIn ? (
        <LoginScreen />
      ) : (
        <View>
          <Heading>Profile</Heading>
          <Title>History</Title>
          <Title>Shoping</Title>
          <Title>Setting</Title>
          <Title>Favor</Title>
          <Title>Notice</Title>
          <FullButton onPress={signOut}>Sign out</FullButton>
        </View>
      )}
    </BottomTabView>
  );
}

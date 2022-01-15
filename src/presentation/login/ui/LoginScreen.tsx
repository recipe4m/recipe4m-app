import { StyleSheet, View } from 'react-native';

import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import Regular from '@common/component/text/Regular';
import useSignInWithGoogle from '../hook/useSignInWithGoogle';

export default function LoginScreen() {
  const signInWithGoogle = useSignInWithGoogle();

  return (
    <View style={styles.container}>
      <Regular>회원가입하고 다양한 레시피를 즐겨보세요</Regular>
      <GoogleSigninButton
        onPress={signInWithGoogle.signIn}
        size={GoogleSigninButton.Size.Wide}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

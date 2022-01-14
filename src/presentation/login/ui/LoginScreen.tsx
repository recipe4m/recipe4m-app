import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';

import { GOOGLE_SIGN_IN_CLIENT_ID } from '@env';
import Regular from '@common/component/text/Regular';
import { View } from 'react-native';

export default function LoginScreen() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_SIGN_IN_CLIENT_ID,
    });
  }, []);

  return (
    <View>
      <Regular>회원가입하고 다양한 레시피를 즐겨보세요</Regular>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}

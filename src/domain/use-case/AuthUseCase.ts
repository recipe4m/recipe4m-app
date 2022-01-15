import * as ApiAuth from '@remote/auth';

import {
  ApiPatchAuthSignOutReqBody,
  ApiPostAuthRefreshReqBody,
  ApiPostAuthSignInReqBody,
  ApiPostAuthSignUpReqBody,
} from '@swagger/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export interface SignInArgs extends ApiPostAuthSignInReqBody {}
export interface SignUpArgs extends ApiPostAuthSignUpReqBody {}
export interface SignOutArgs extends ApiPatchAuthSignOutReqBody {}
export interface RefreshArgs extends ApiPostAuthRefreshReqBody {}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export class AuthUseCase {
  async signIn(signInArgs: SignInArgs): Promise<Tokens> {
    try {
      const res = await ApiAuth.apiPostAuthSignIn(signInArgs);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async signUp(signUpArgs: SignUpArgs): Promise<Tokens> {
    try {
      const res = await ApiAuth.apiPostAuthSignUp(signUpArgs);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async signOut(signOutArgs: SignOutArgs): Promise<null> {
    try {
      const res = await ApiAuth.apiPatchAuthSignOut(signOutArgs);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async refresh(refreshArgs: RefreshArgs): Promise<Tokens> {
    try {
      const res = await ApiAuth.apiPostAuthRefresh(refreshArgs);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async signUpWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;

      return await this.signUp({
        provider: 'GOOGLE',
        token: idToken as string,
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      throw error;
    } finally {
      GoogleSignin.signOut();
    }
  }

  async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;

      return await this.signIn({
        provider: 'GOOGLE',
        token: idToken as string,
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      throw error;
    } finally {
      GoogleSignin.signOut();
    }
  }
}

export default new AuthUseCase();

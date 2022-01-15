import {
  ApiPatchAuthSignOutReqBody,
  ApiPostAuthRefreshReqBody,
  ApiPostAuthRefreshResData,
  ApiPostAuthSignInReqBody,
  ApiPostAuthSignInResData,
  ApiPostAuthSignUpReqBody,
  ApiPostAuthSignUpResData,
} from '@swagger/auth';

import { axiosClient } from '@application/lib/AxiosClient';

export async function apiPostAuthSignIn(body: ApiPostAuthSignInReqBody) {
  try {
    return axiosClient.post<ApiPostAuthSignInResData, ApiPostAuthSignInReqBody>(
      'auth/sign-in',
      body,
    );
  } catch (error) {
    throw error;
  }
}

export async function apiPostAuthSignUp(body: ApiPostAuthSignUpReqBody) {
  try {
    return axiosClient.post<ApiPostAuthSignUpResData, ApiPostAuthSignUpReqBody>(
      'auth/sign-up',
      body,
    );
  } catch (error) {
    throw error;
  }
}

export async function apiPatchAuthSignOut(body: ApiPatchAuthSignOutReqBody) {
  try {
    return axiosClient.patch<null, ApiPatchAuthSignOutReqBody>(
      'auth/sign-out',
      body,
    );
  } catch (error) {
    throw error;
  }
}

export async function apiPostAuthRefresh(body: ApiPostAuthRefreshReqBody) {
  try {
    return axiosClient.post<
      ApiPostAuthRefreshResData,
      ApiPostAuthRefreshReqBody
    >('auth/refresh', body);
  } catch (error) {
    throw error;
  }
}

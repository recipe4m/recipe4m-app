import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { API_BASE_URL } from '@env';

export interface ApiErrorResponse {
  errorCode: number;
  errorMsg: string;
}
export class AxiosClient {
  static RETRY_COUNT = 3;

  private _axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this._axiosInstance = Axios.create(config);
  }

  private set authorization(token: string | undefined) {
    if (token) {
      this._axiosInstance.defaults.headers.common.Authorization = token;
    } else {
      delete this._axiosInstance.defaults.headers.common.Authorization;
    }
  }

  setBearerToken(token: string) {
    this.authorization = `Bearer ${token}`;
  }

  resetBearerToken() {
    this.authorization = undefined;
  }

  getAxiosError(error: any): any {
    if ((error as AxiosError).isAxiosError && error.response) {
      return error.response.data as ApiErrorResponse;
    }

    return null;
  }

  async request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
    retry = AxiosClient.RETRY_COUNT,
  ): Promise<R> {
    try {
      if (retry <= 0) throw new Error('Network Error');
      return await this._axiosInstance.request(config);
    } catch (error) {
      throw error;
    }
  }

  async get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'get',
        url,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async post<T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'post',
        url,
        data,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'delete',
        url,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async patch<T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'patch',
        url,
        data,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }
}

export const axiosClient = new AxiosClient({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

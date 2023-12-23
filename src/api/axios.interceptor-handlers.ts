import { AuthDto } from "app/auth/types/auth.dto";
import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { LocalStorageKey } from "enums/local-storage-key.enum";
import { axiosAuthClient } from "./axios.client";

export const onFulfilledRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  const accessToken = localStorage.getItem(LocalStorageKey.AccessToken);
  config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
};

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

export const onRejectedResponse = async (error: any) => {
  const originalRequest: AxiosRequestConfig = error.config;

  if (error.response && error.response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const { data } = await axiosAuthClient.post<any, AxiosResponse<AuthDto>>("/auth/refresh-tokens");

        localStorage.setItem(LocalStorageKey.AccessToken, data.accessToken);

        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;

        refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
          axiosAuthClient
            .request(config)
            .then((response) => resolve(response))
            .catch((err) => reject(err));
        });

        refreshAndRetryQueue.length = 0;

        return axiosAuthClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(LocalStorageKey.AccessToken);
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise<void>((resolve, reject) => {
      refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
    });
  }

  return Promise.reject(error);
};

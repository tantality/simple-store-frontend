import { AuthDto } from "app/auth/types/auth.dto";
import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { axiosAuthClient } from "./axios.client";

interface ExtendedAxiosConfig extends AxiosRequestConfig {
  retry: boolean;
}

export const onFulfilledRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  const accessToken = localStorage.getItem("access-token");
  config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
};

export const onRejectedResponse = async (err: any): Promise<any> => {
  const res = await handleResponseError(err);
  return res;
};

const handleResponseError = async (err: any): Promise<any> => {
  if (isAxiosError(err)) {
    const requestConfig = err.config as ExtendedAxiosConfig;
    const errStatus = err.response?.status;

    if (errStatus && requestConfig.retry) {
      return Promise.reject(err);
    }

    switch (errStatus) {
      case 401: {
        const res = await handleUnauthorizedError(requestConfig);
        return res;
      }
    }
  }

  return Promise.reject(err);
};

const handleUnauthorizedError = async (config: ExtendedAxiosConfig): Promise<any> => {
  config.retry = true;

  try {
    const { data } = await axiosAuthClient.post<any, AxiosResponse<AuthDto>>("/auth/refresh-tokens");

    localStorage.setItem("access-token", data.accessToken);

    return axiosAuthClient(config);
  } catch (error) {
    localStorage.removeItem("access-token");

    return Promise.reject(error);
  }
};

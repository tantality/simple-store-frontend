import axios from "axios";

import { onFulfilledRequest, onRejectedResponse } from "./axios.interceptor-handlers";

const REACT_APP_API_URL = "http://localhost:3001/api/v1";

export const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const axiosAuthClient = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});

axiosAuthClient.interceptors.request.use(onFulfilledRequest);
axiosAuthClient.interceptors.response.use((res) => res, onRejectedResponse);

import Axios, { InternalAxiosRequestConfig } from "axios";

import { useToast } from "@/hooks/use-toast";
import { env } from "@/config/env";
import { TIME_OUT } from "@/utils/constants";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/utils/helper";
import STORAGE from "@/utils/storage";
import { ENDPOINT_API, VARIANT_COLOR } from "@/utils/enums";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getLocalStorage(STORAGE.accessToken);
  if (token && config.headers) {
    config.timeout = TIME_OUT;
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.withCredentials = true;
  return config;
}

async function refreshToken() {
  const data = {
    accessToken: getLocalStorage(STORAGE.accessToken),
    refreshToken: getLocalStorage(STORAGE.refreshToken),
  };
  return await AxiosInstance
    .post(ENDPOINT_API.REFRESH_TOKEN, data)
    .then((response) => response.data);
}

function goToLogin() {
  const searchParams = new URLSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  window.location.href = `${ENDPOINT_API.LOGIN}?redirectTo=${redirectTo}`;
}

export const AxiosInstance = Axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(authRequestInterceptor, (err) => {
  return Promise.reject(err);
});
AxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { config, response } = error;
    const message = response?.data?.message || error.message;
    useToast().toast({ title: message, variant: VARIANT_COLOR.DANGER });

    if (
      response?.status === 401 &&
      !config?.url?.includes(ENDPOINT_API.REFRESH_TOKEN)
    ) {
      return refreshToken()
        .then((res) => {
          const { accessToken = null, refreshToken = null } = res;
          setLocalStorage(STORAGE.accessToken, accessToken);
          setLocalStorage(STORAGE.refreshToken, refreshToken);
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return AxiosInstance(config);
        })
        .catch(() => {
          goToLogin();
        });
    } else {
      goToLogin();
    }

    return Promise.reject(error);
  }
);

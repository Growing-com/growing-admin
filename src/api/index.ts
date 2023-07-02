import axios, { AxiosRequestConfig } from "axios";
import NetworkConfig from "config/NetworkConfig";

const defaultHeaders = {
  Accept: "aplication/json",
  "Content-Type": "application/json"
};

export const REQUEST_METHOD = {
  GET: "get",
  POST: "post"
};

const axiosInstance = axios.create({
  headers: defaultHeaders,
  ...NetworkConfig.BASE_REQUEST
});

axiosInstance.interceptors.request.use(config => {
  if (!config.headers?.Authorization) {
    config.headers.Authorization = "Bear";
  }
  return config;
});

// 에러 response Type?
const request = async <ResponseType>(options: AxiosRequestConfig) => {
  try {
    const { data } = await axiosInstance.request<ResponseType>(options);
    return data;
  } catch (e: unknown) {
    console.error("REQUEST ERROR", e);
    throw new Error(" error");
  }
};

export { request };

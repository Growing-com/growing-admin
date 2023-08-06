import axios, { AxiosRequestConfig, type AxiosError } from "axios";
import NetworkConfig from "config/NetworkConfig";

const defaultHeaders = {
  "Content-Type": "application/json"
};

export const REQUEST_METHOD = {
  GET: "get",
  POST: "post"
};

const axiosInstance = axios.create({
  headers: defaultHeaders,
  withCredentials: true,
  ...NetworkConfig.BASE_REQUEST
});

// 에러 response Type?
const request = async <ResponseType, RequestType = unknown>(
  options: AxiosRequestConfig<RequestType>
) => {
  try {
    const { data } = await axiosInstance.request<ResponseType>(options);
    return data;
  } catch (error: AxiosError) {
    const { response } = error;
    const errorResponse = {
      message: response?.data?.message ?? error.message,
      code: response?.data?.status
    };
    throw errorResponse;
  }
};

export { request };

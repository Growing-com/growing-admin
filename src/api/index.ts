import axios, { AxiosRequestConfig } from "axios";
import NetworkConfig from "config/NetworkConfig";

const defaultHeaders = {
  "Content-Type": "application/json"
};

export const REQUEST_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put"
};

const axiosInstance = axios.create({
  headers: defaultHeaders,
  withCredentials: true,
  ...NetworkConfig.BASE_REQUEST
});

type AxiosResponseDataForm<T> = {
  content: T;
  totalPages?: number;
  size: number;
};

// 에러 response Type?
const request = async <ResponseType, RequestType = unknown>(
  options: AxiosRequestConfig<RequestType>
) => {
  try {
    const { data } = await axiosInstance.request<
      AxiosResponseDataForm<ResponseType>
    >(options);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const { response } = error;
    const errorResponse = {
      message: response?.data?.message ?? error.message,
      code: response?.data?.status
    };
    throw errorResponse;
  }
};

export { request };

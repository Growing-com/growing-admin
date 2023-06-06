import axios from "axios";
import NetworkConfig from "config/NetworkConfig";

const defaultHeaders = {
  Accept: "aplication/json",
  "Content-Type": "application/json"
};

const request = axios.create({
  headers: defaultHeaders,
  ...NetworkConfig.BASE_REQUEST
});

request.interceptors.request.use(config => {
  if (!config.headers?.Authorization) {
    config.headers.Authorization = "Bear";
  }
  return config;
});

export { request };

const DEFAULT_TIMEOUT = 20 * 1000;

// const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;
// const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://13.125.141.167:8080/api";


const NetworkConfig = {
  BASE_REQUEST: {
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    timeout: DEFAULT_TIMEOUT
  },
  // DEV_REQUEST: {
  //   baseURL: DEV_BASE_URL,
  //   timeout: DEFAULT_TIMEOUT
  // },
  COOKIE_KEYS: {
    dtsession: "dtsession",
    accessToken: "accessToken",
    garageAccessToken: "garageAccessToken"
  }
};

export default NetworkConfig;

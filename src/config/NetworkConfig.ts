const DEFAULT_TIMEOUT = 20 * 1000;

const {
    NODE_ENV,
    LOCAL_URL,
    DEV_URL
} = process.env;

const BASE_URL = NODE_ENV === 'development' ? DEV_URL : LOCAL_URL;

const NetworkConfig = {
    BASE_REQUEST: {
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT
    }
}

export default NetworkConfig;
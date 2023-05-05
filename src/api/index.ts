import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios"
import NetworkConfig from "config/NetworkConfig";

type responseConfig = {
    
}

const defaultHeaders = {
    'Accept': 'aplication/json',
    'Content-Type': 'application/json',
};

const baseNetWork = () => {
    return axios.create({
        ...NetworkConfig.BASE_REQUEST
    })
}

const baseApi = (option: AxiosRequestConfig) =>{
    baseNetWork().interceptors.request.use(
        config => {
            if( !config.headers?.Authorization ){
                config.headers = defaultHeaders
            }
            return config;
        }
    )
    return baseNetWork().request(option);
}

const request = async (option: AxiosRequestConfig) => {
    try{
        return await baseApi(option);
    }catch(error){
        console.log("Error Network",error)
    }
}

export {
    request
}

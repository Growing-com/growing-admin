import { REQUEST_METHOD, request } from 'api';
import { tNewFamily } from './type';

const version = "v1";

export const getNewfamilies = () => {
    return request<tNewFamily[]>({
        method: REQUEST_METHOD.GET,
        url: `${version}/new-families`,
      });
}
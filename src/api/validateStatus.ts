import axios, { AxiosResponse } from "axios";
import { BearerToken } from "../types";
import { SERVER } from "./connection";

export const validateStatus = async (authorization: BearerToken): Promise<AxiosResponse> => {
    const response = await axios({
        method: 'get',
        baseURL: SERVER,
        url: '/users/me',
        headers: {
            'Authorization': `${authorization.type} ${authorization.token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

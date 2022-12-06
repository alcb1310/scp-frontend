import axios, { AxiosResponse } from "axios"
import { BearerToken } from "../types";
import { SERVER } from "./connection";

export const getRequest = async (endPoint: string, uuid: string | null = null, authorization: BearerToken): Promise<AxiosResponse> => {
    const url = uuid ? `${endPoint}/${uuid}` : endPoint

    const response: AxiosResponse = await axios ({
        method: 'get',
        baseURL: SERVER,
        url,
        headers: {
            'Authorization': authorization ? `${authorization.type} ${authorization.token}` : null,
            'Content-Type': 'application/json'
        }
    })

    return response
}

type queryParamsType = {
    key: string,
    value: string
}

export const getRequestWithQueryString =async (url: string, queryParameter: queryParamsType[], authorization: BearerToken): Promise<AxiosResponse> => {
    const params = queryParameter.reduce((allData, query: queryParamsType) => ({...allData, [query.key]: query.value}), {})

    console.log(params);
    

    const response: AxiosResponse = await axios ({
        method: 'get',
        baseURL: SERVER,
        url,
        params,
        headers: {
            'Authorization': authorization ? `${authorization.type} ${authorization.token}` : null,
            'Content-Type': 'application/json'
        }
    })

    return response
}
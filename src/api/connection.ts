import axios, { AxiosResponse } from "axios"

const SERVER: string = import.meta.env.VITE_SERVER

type bearerToken = {
    token: string,
    type: string
}

export const postRequest = async (endPoint: string, payload: any, authorization: bearerToken | null = null ): Promise<AxiosResponse> =>  {
    const response: AxiosResponse = await axios({
        method: 'post',
        url: endPoint,
        baseURL: SERVER,
        data: payload,
        headers: {
            'Authorization': authorization ? `${authorization.type} ${authorization.token}` : null,
            'Content-Type': 'application/json'
        }
    })

    return response
}

export const putRequest =async (endPoint:string, uuid: string, payload: any, authorization: bearerToken): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axios({
        method: 'put',
        baseURL: SERVER,
        url: `${endPoint}/${uuid}`,
        data: payload,
        headers: {
            'Authorization': authorization ? `${authorization.type} ${authorization.token}` : null,
            'Content-Type': 'application/json'
        }
    })

    return response
}

export const getRequest = async (endPoint: string, uuid: string | null = null, authorization: bearerToken): Promise<AxiosResponse> => {
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

export const validateStatus = async (authorization: bearerToken): Promise<AxiosResponse> => {
    const response = await axios ({
        method: 'get',
        baseURL: SERVER,
        url: '/users/me',
        headers:{
            'Authorization': `${authorization.type} ${authorization.token}`,
            'Content-Type': 'application/json'
        }
    })
    return response
}
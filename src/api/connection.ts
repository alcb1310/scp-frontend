import axios, { AxiosResponse } from "axios"

const SERVER: string = import.meta.env.VITE_SERVER

type bearerToken = {
    token: string,
    type: string
}

export const postRequest = async (endPoint: string, payload: any, authorization: bearerToken | null = null ): Promise<AxiosResponse> =>  {
    const response = await axios({
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
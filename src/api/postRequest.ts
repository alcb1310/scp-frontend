/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { BearerToken } from "../types";
import { SERVER } from "../assets";

export default async function postRequest(
  endPoint: string,
  payload: any,
  authorization: BearerToken | null = null
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios({
    method: "post",
    url: endPoint,
    baseURL: SERVER,
    data: payload,
    headers: {
      Authorization: authorization
        ? `${authorization.type} ${authorization.token}`
        : null,
      "Content-Type": "application/json",
    },
  });

  return response;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { BearerToken } from "../types";
import { SERVER } from "../assets";

export default async function putRequest(
  endPoint: string,
  uuid: string,
  payload: any,
  authorization: BearerToken
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios({
    method: "put",
    baseURL: SERVER,
    url: `${endPoint}/${uuid}`,
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

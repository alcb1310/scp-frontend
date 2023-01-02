/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import axios, { AxiosResponse } from "axios";
import { BearerToken } from "../types";
import { SERVER } from "./connection";

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

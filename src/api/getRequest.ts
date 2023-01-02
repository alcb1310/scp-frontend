/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable import/no-cycle */
import axios, { AxiosResponse } from "axios";
import { BearerToken } from "../types";
import { SERVER } from "./connection";
import { QueryParamsType } from "../types/queryParamsType";

export async function getRequest(
  endPoint: string,
  uuid: string | null = null,
  authorization: BearerToken
): Promise<AxiosResponse> {
  const url = uuid ? `${endPoint}/${uuid}` : endPoint;

  const response: AxiosResponse = await axios({
    method: "get",
    baseURL: SERVER,
    url,
    headers: {
      Authorization: authorization
        ? `${authorization.type} ${authorization.token}`
        : null,
      "Content-Type": "application/json",
    },
  });

  return response;
}

export const getRequestWithQueryString = async (
  url: string,
  queryParameter: QueryParamsType[],
  authorization: BearerToken
): Promise<AxiosResponse> => {
  const params = queryParameter.reduce(
    (allData, query: QueryParamsType) => ({
      ...allData,
      [query.key]: query.value,
    }),
    {}
  );

  const response: AxiosResponse = await axios({
    method: "get",
    baseURL: SERVER,
    url,
    params,
    headers: {
      Authorization: authorization
        ? `${authorization.type} ${authorization.token}`
        : null,
      "Content-Type": "application/json",
    },
  });

  return response;
};

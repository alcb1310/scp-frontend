/* eslint-disable import/no-cycle */
import { getRequest } from "./connection";
import { StoreDataType } from "../types";

export default function getProjects(storeData: StoreDataType) {
  return getRequest("/projects", null, {
    token: storeData.token,
    type: storeData.type,
  });
}

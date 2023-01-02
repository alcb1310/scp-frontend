/* eslint-disable import/no-cycle */
import { StoreDataType } from "../types";
import { getRequest } from "./connection";

export default function getSuppliers(storeData: StoreDataType) {
  return getRequest("/suppliers", null, {
    token: storeData.token,
    type: storeData.type,
  });
}

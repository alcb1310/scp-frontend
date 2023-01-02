/* eslint-disable import/no-cycle */
import { getRequest } from "./connection";
import { StoreDataType } from "../types";

export default function getBudgetItems(storeData: StoreDataType) {
  return getRequest("/budget-items", null, {
    token: storeData.token,
    type: storeData.type,
  });
}

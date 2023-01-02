/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { getSuppliers, getRequestWithQueryString } from "./connection";
import { StoreDataType } from "../types";

export default async function fetchProjectsAndSuppliers(
  storeData: StoreDataType,
  setIsLoading: any,
  setProjects: any,
  setSuppliers: any
): Promise<void> {
  setIsLoading(true);

  const [projects, suppliers] = await Promise.all([
    getRequestWithQueryString("/projects", [{ key: "active", value: "true" }], {
      token: storeData.token,
      type: storeData.type,
    }),
    getSuppliers(storeData),
  ]);
  setProjects(projects.data.detail);
  setSuppliers(suppliers.data.detail);

  setIsLoading(false);
}

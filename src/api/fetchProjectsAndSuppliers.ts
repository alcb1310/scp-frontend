/* eslint-disable import/no-cycle */
import { Dispatch, SetStateAction } from "react";
import { getSuppliers, getRequestWithQueryString } from "./connection";
import { GetSuppliersType, ProjectType, StoreDataType } from "../types";

export default async function fetchProjectsAndSuppliers(
  storeData: StoreDataType,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setProjects: Dispatch<SetStateAction<ProjectType[]>>,
  setSuppliers: Dispatch<SetStateAction<GetSuppliersType[]>>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { StoreDataType } from "../types";
import { getRequestWithQueryString } from "./connection";

export default async function fetchProjectsAndBudgetItems(
  storeData: StoreDataType,
  setIsLoading: any,
  setProjects: any,
  setBudgetItems: any
): Promise<void> {
  setIsLoading(true);
  const [projectResponse, budgetItemResponse] = await Promise.all([
    getRequestWithQueryString("/projects", [{ key: "active", value: "true" }], {
      token: storeData.token,
      type: storeData.type,
    }),
    getRequestWithQueryString(
      "/budget-items",
      [
        { key: "accumulates", value: "false" },
        { key: "sort", value: "name" },
      ],
      { token: storeData.token, type: storeData.type }
    ),
  ]);

  setProjects(projectResponse.data.detail);
  setBudgetItems(budgetItemResponse.data.detail);
  setIsLoading(false);
}

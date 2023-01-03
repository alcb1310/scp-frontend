/* eslint-disable import/no-cycle */
import { Dispatch, SetStateAction } from "react";
import { BudgetItemType, ProjectType, StoreDataType } from "../types";
import { getRequestWithQueryString } from "./getRequest";

export default async function fetchProjectsAndBudgetItems(
  storeData: StoreDataType,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setProjects: Dispatch<SetStateAction<ProjectType[]>>,
  setBudgetItems: Dispatch<SetStateAction<BudgetItemType[]>>
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

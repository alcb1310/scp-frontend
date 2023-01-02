/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRequest } from "../../api/connection";
import { DisplayStatusType, StoreDataType, BudgetItemType } from "../../types";
import {
  BudgetItemEditData,
  BudgetItemAddData,
  BudgetItemHomeData,
} from "../../helpers/BudgetItems";
import Loading from "../Elements/Loading";

export default function BudgetItems() {
  const [budgetItems, setBudgetItems] = useState<BudgetItemType[]>([]);
  const [selectedBudgetItem, setSelectedBudgetItem] = useState<BudgetItemType>({
    uuid: "",
    code: "",
    name: "",
    level: 0,
    accumulates: false,
    parent: null,
  });
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);
  const [infoToDisplay, setInfoToDisplay] = useState<DisplayStatusType>("home");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const budgetData = await getRequest("/budget-items", null, {
      token: storeData.token,
      type: storeData.type,
    });

    setBudgetItems(budgetData.data.detail);
    setIsLoading(false);
  };

  const addBudgetItem = () => {
    setInfoToDisplay("add");
  };

  const editBudgetItem = async (budgetItemUuid: string) => {
    setIsLoading(true);
    const selectedBudgetItemResponse = await getRequest(
      "/budget-items",
      budgetItemUuid,
      { token: storeData.token, type: storeData.type }
    );

    setIsLoading(false);
    setSelectedBudgetItem(selectedBudgetItemResponse.data.detail);

    setInfoToDisplay("edit");
  };

  const saveBudgetItem = async () => {
    setInfoToDisplay("home");
    await fetchData();
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const info = isLoading ? (
    <Loading />
  ) : infoToDisplay === "home" ? (
    <BudgetItemHomeData
      budgetItems={budgetItems}
      addBudgetItem={addBudgetItem}
      editBudgetItem={editBudgetItem}
    />
  ) : infoToDisplay === "add" ? (
    <BudgetItemAddData saveBudgetItem={saveBudgetItem} />
  ) : "uuid" in selectedBudgetItem ? (
    <BudgetItemEditData
      saveBudgetItem={saveBudgetItem}
      budgetItem={selectedBudgetItem}
    />
  ) : (
    "Unable to find budget item"
  );

  return <div className="w-full">{info}</div>;
}

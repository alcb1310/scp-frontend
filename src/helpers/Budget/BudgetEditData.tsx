/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProjectsAndBudgetItems, putRequest } from "../../api/connection";
import {
  BudgetItemType,
  ErrorType,
  ProjectType,
  StoreDataType,
  BudgetType,
  BudgetFormType,
} from "../../types";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Loading from "../../components/Elements/Loading";
import { BudgetFormData } from ".";

export default function BudgetEditData({
  saveBudget,
  selectedBudget,
}: {
  saveBudget: any;
  selectedBudget: BudgetType | null;
}) {
  const [budgetToEdit, setBudgetToEdit] = useState<BudgetFormType>({
    uuid: selectedBudget ? selectedBudget.uuid : "",
    project_id: selectedBudget ? selectedBudget.project.uuid : "",
    budget_item_id: selectedBudget ? selectedBudget.budget_item.uuid : "",
    quantity: selectedBudget
      ? selectedBudget.to_spend_quantity
        ? selectedBudget.to_spend_quantity
        : 0
      : 0,
    cost: selectedBudget
      ? selectedBudget.to_spend_cost
        ? selectedBudget.to_spend_cost
        : 0
      : 0,
  });
  const [error, setError] = useState<ErrorType | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const storeData = useSelector((state: StoreDataType) => state);

  useEffect(() => {
    fetchProjectsAndBudgetItems(
      storeData,
      setIsLoading,
      setProjects,
      setBudgetItems
    ).catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await putRequest("/budgets", budgetToEdit.uuid, budgetToEdit, {
        token: storeData.token,
        type: storeData.type,
      });
      saveBudget();
    } catch (err: any) {
      if (err.response.status === 409)
        setError({
          errorKey: "project_id",
          errorDescription: err.response.data.detail,
        });
      else setError(err.response.data.detail);
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, valueAsNumber } = event.target;
    setError(null);

    const saveValue =
      type === "number" && !Number.isNaN(valueAsNumber) ? valueAsNumber : value;

    setBudgetToEdit((prevBudget) => ({ ...prevBudget, [name]: saveValue }));
  };

  const dataToDisplay = isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <BudgetFormData
        budget={budgetToEdit}
        error={error}
        projects={projects}
        budgetItems={budgetItems}
        onChange={handleChange}
      />
      <PrimaryButton buttonType="submit" text="Submit" onEvent={handleSubmit} />
    </form>
  );

  return dataToDisplay;
}

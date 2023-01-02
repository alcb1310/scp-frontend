/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BudgetType, ProjectType, StoreDataType } from "../../types";
import { SelectElement } from "../Inputs";
import { getRequestWithQueryString } from "../../api/connection";
import Loading from "../Elements/Loading";
import { QueryParamsType } from "../../types/queryParamsType";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Actual() {
  const [hasData, setHasData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [level, setLevel] = useState<number>(4);

  const storeData = useSelector((state: StoreDataType) => state);

  const loadProjects = async () => {
    setIsLoading(true);
    const params: QueryParamsType[] = [
      {
        key: "active",
        value: "true",
      },
    ];
    const projectsData = await getRequestWithQueryString("/projects", params, {
      token: storeData.token,
      type: storeData.type,
    });
    setProjects(projectsData.data.detail);
    setIsLoading(false);
  };

  const loadBudget = async () => {
    setIsLoading(true);
    const params: QueryParamsType[] = [
      {
        key: "project",
        value: selectedProject,
      },
      {
        key: "level",
        value: level,
      },
    ];
    const selectedBudget = await getRequestWithQueryString("/budgets", params, {
      token: storeData.token,
      type: storeData.type,
    });
    console.log(selectedBudget);

    setBudgets(selectedBudget.data.detail);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = projects.map((project) => {
    return (
      <option value={project.name} key={project.uuid}>
        {project.name}
      </option>
    );
  });

  const handleProjectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedProject(value);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") setLevel(4);
    setLevel(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (selectedProject === "") {
      setHasData(false);
      return;
    }
    loadBudget();
    setHasData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, level]);

  const handleExcelClick = async () => {
    const params: QueryParamsType[] = [
      {
        key: "project",
        value: selectedProject,
      },
      {
        key: "level",
        value: level,
      },
    ];
    const result = await getRequestWithQueryString("/excel/budgets", params, {
      type: storeData.type,
      token: storeData.token,
    });

    console.log(result);
  };

  const budgetDisplayData = budgets.map((budget) => {
    return (
      <tr
        key={budget.uuid}
        className={budget.budget_item.accumulates ? "font-bold" : "font-normal"}
      >
        <td>{budget.budget_item.code}</td>
        <td>{budget.budget_item.name}</td>
        <td className="text-right">
          {budget.spent_quantity === null
            ? null
            : budget.spent_quantity.toFixed(2)}
        </td>
        <td className="text-right">{budget.spent_total.toFixed(2)}</td>
        <td className="text-right">
          {budget.to_spend_quantity === null
            ? null
            : budget.to_spend_quantity.toFixed(2)}
        </td>
        <td className="text-right">
          {budget.to_spend_cost === null
            ? null
            : budget.to_spend_total.toFixed(2)}
        </td>
        <td className="text-right">{budget.to_spend_total.toFixed(2)}</td>
        <td className="text-right">{budget.updated_budget.toFixed(2)}</td>
      </tr>
    );
  });

  const showResults = hasData && (
    <table className="mt-2 mx-auto table-auto">
      <thead className="border-b-2 border-black font-bold bg-indigo-200">
        <tr>
          <th colSpan={2} className="text-center p-3">
            Budget Item
          </th>
          <th colSpan={2} className="text-center p-3">
            Spent
          </th>
          <th colSpan={3} className="text-center p-3">
            To Spend
          </th>
          <th rowSpan={2} className="text-center p-3">
            Total
          </th>
        </tr>
        <tr>
          <th className="text-center p-3">Code</th>
          <th className="text-center p-3">Name</th>
          <th className="text-center p-3">Quantity</th>
          <th className="text-center p-3">Total</th>
          <th className="text-center p-3">Quantity</th>
          <th className="text-center p-3">Cost</th>
          <th className="text-center p-3">Total</th>
        </tr>
      </thead>
      <tbody>{budgetDisplayData}</tbody>
    </table>
  );

  const infoToDisplay = isLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="text-center text-3xl font-bold mt-5">Current Budget</h1>
      <SelectElement
        label="Project"
        error={null}
        inputName="project"
        required
        value={selectedProject}
        onChange={handleProjectChange}
      >
        {projectOptions}
      </SelectElement>
      <SelectElement
        label="Level"
        error={null}
        inputName="laber"
        required
        value={level}
        onChange={handleLevelChange}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </SelectElement>
      {hasData && (
        <PrimaryButton
          buttonType="button"
          text="Excel"
          onEvent={handleExcelClick}
        />
      )}
      {showResults}
    </>
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{infoToDisplay}</>;
}

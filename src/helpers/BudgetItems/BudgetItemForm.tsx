/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorType } from "../../types";
import {
  InputElement,
  SelectElement,
  CheckboxElement,
} from "../../components/Inputs";

export default function BudgetItemForm({
  error,
  handleChange,
  budgetItem,
  parents,
}: {
  error: ErrorType | null;
  handleChange: any;
  budgetItem: any;
  parents: any[];
}) {
  const options = parents.map((parent) => {
    return (
      <option key={parent.uuid} value={parent.uuid}>
        {parent.name}
      </option>
    );
  });

  return (
    <>
      <InputElement
        label="Code"
        error={error}
        inputName="code"
        required
        inputType="text"
        onChange={handleChange}
        value={budgetItem.code}
        enabled
      />
      <InputElement
        label="Name"
        error={error}
        inputName="name"
        required
        inputType="text"
        onChange={handleChange}
        value={budgetItem.name}
        enabled
      />
      <InputElement
        label="Level"
        error={error}
        inputName="level"
        required
        inputType="number"
        onChange={handleChange}
        value={budgetItem.level}
        enabled
      />
      <CheckboxElement
        name="accumulates"
        label="Accumulates"
        required={false}
        checked={budgetItem.accumulates}
        onChange={handleChange}
      />
      <SelectElement
        label="Parent"
        error={error}
        inputName="parentUuid"
        required={false}
        value={budgetItem.parentUuid}
        onChange={handleChange}
      >
        {options}
      </SelectElement>
    </>
  );
}

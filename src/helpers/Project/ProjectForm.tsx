/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorType, ProjectType } from "../../types";
import { CheckboxElement, InputElement } from "../../components/Inputs";

function ProjectForm({
  error,
  onChange,
  project,
}: {
  error: ErrorType | null;
  onChange: any;
  project: ProjectType | null;
}) {
  return (
    <>
      <InputElement
        label="Name"
        error={error}
        inputName="name"
        required
        inputType="text"
        onChange={onChange}
        value={project ? project.name : ""}
        enabled
      />
      <CheckboxElement
        name="is_active"
        label="Active"
        required={false}
        checked={project ? project.is_active : false}
        onChange={onChange}
      />
    </>
  );
}

export default ProjectForm;

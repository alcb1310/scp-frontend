/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { putRequest } from "../../api/connection";
// eslint-disable-next-line import/no-cycle
import { ProjectForm } from ".";
import { ErrorType, StoreDataType, ProjectType } from "../../types";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

export default function ProjectEditData({
  saveProject,
  project,
}: {
  saveProject: any;
  project: ProjectType;
}) {
  const [projectToEdit, setProjectToEdit] = useState<ProjectType>(project);
  const [error, setError] = useState<ErrorType | null>(null);
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      projectToEdit.uuid !== undefined &&
        (await putRequest("/projects", projectToEdit.uuid, projectToEdit, {
          token: storeData.token,
          type: storeData.type,
        }));
      saveProject();
    } catch (err: any) {
      if (err.response.status === 409)
        setError({
          errorKey: "name",
          errorDescription: err.response.data.detail,
        });
      else setError(err.response.data.detail);
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setError(null);

    const changeValue = name === "is_active" ? checked : value;
    setProjectToEdit((prevProject) => ({
      ...prevProject,
      [name]: changeValue,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProjectForm
        error={error}
        onChange={handleChange}
        project={projectToEdit}
      />
      <PrimaryButton buttonType="submit" text="Submit" onEvent={handleSubmit} />
    </form>
  );
}

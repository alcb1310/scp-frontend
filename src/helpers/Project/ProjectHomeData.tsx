/* eslint-disable @typescript-eslint/no-explicit-any */
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "../../components/Buttons/AddButton";
import { ProjectType } from "../../types";

export default function ProjectHomeData({
  projects,
  addProject,
  editProject,
}: {
  projects: ProjectType[];
  addProject: any;
  editProject: any;
}) {
  const projectsInfo = projects.map((project) => {
    return (
      <tr
        className="hover:bg-indigo-100"
        key={project.uuid}
        onClick={() => {
          editProject(project.uuid);
        }}
      >
        <td className="border-x-2 p-3">{project.name}</td>
        <td className="border-x-2 p-3 text-center">
          <FontAwesomeIcon icon={project.is_active ? faCheck : faXmark} />
        </td>
      </tr>
    );
  });

  return (
    <table className="mt-2 mx-auto table-auto">
      <caption className="text-left text-2xl font-semibold uppercase pb-5">
        <div className="flex justify-between items-center">
          <p>Projects</p>
          <div className="text-base">
            <AddButton buttonType="button" text="Add" onEvent={addProject} />
          </div>
        </div>
      </caption>
      <thead className="border-b-2 border-black font-bold bg-indigo-200">
        <tr>
          <th className="text-center p-3">Name</th>
          <th className="text-center p-3">Active</th>
        </tr>
      </thead>
      <tbody className="border-b-2">{projectsInfo}</tbody>
    </table>
  );
}

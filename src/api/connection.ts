import { postRequest } from "./postRequest"
import { putRequest } from "./putRequest";
import { getRequest, getRequestWithQueryString } from "./getRequest";
import { validateStatus } from "./validateStatus";
import { fetchProjectsAndBudgetItems } from "./fetchProjectsAndBudgetItems";
import { getProjects } from "./getProjects";
import { getBudgetItems } from "./getBudgetItems";

const SERVER: string = import.meta.env.VITE_SERVER

export { SERVER, postRequest, putRequest, getRequest, getRequestWithQueryString, validateStatus, fetchProjectsAndBudgetItems, getProjects, getBudgetItems }
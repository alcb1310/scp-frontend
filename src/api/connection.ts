import { fetchDetailData } from './fetchDetailData';
import { downloadFileWithQueryString } from './downloadFileWithQueryString';
import { postRequest } from './postRequest';
import { putRequest } from './putRequest';
import { getRequest, getRequestWithQueryString } from './getRequest';
import { validateStatus } from './validateStatus';
import { fetchProjectsAndBudgetItems } from './fetchProjectsAndBudgetItems';
import { getProjects } from './getProjects';
import { getBudgetItems } from './getBudgetItems';
import { getSuppliers } from './getSuppliers';
import { fetchProjectsAndSuppliers } from './fetchProjectsAndSuppliers';

const SERVER: string = import.meta.env.VITE_SERVER;

export {
	SERVER,
	postRequest,
	putRequest,
	getRequest,
	getRequestWithQueryString,
	validateStatus,
	fetchProjectsAndBudgetItems,
	getProjects,
	getBudgetItems,
	getSuppliers,
	fetchProjectsAndSuppliers,
	downloadFileWithQueryString,
	fetchDetailData,
};

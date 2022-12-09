import { StoreDataType } from '../types';
import { getProjects, getBudgetItems } from './connection';

export const fetchProjectsAndBudgetItems = async (
	storeData: StoreDataType,
	setIsLoading: any,
	setProjects: any,
	setBudgetItems: any
) => {
	setIsLoading(true);
	const [projectResponse, budgetItemResponse] = await Promise.all([
		getProjects(storeData),
		getBudgetItems(storeData),
	]);

	setProjects(projectResponse.data.detail);
	setBudgetItems(budgetItemResponse.data.detail);
	setIsLoading(false);
};

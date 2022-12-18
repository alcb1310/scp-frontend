import { StoreDataType } from '../types';
import { getBudgetItems, getRequestWithQueryString } from './connection';

export const fetchProjectsAndBudgetItems = async (
	storeData: StoreDataType,
	setIsLoading: any,
	setProjects: any,
	setBudgetItems: any
) => {
	setIsLoading(true);
	const [projectResponse, budgetItemResponse] = await Promise.all([
		getRequestWithQueryString(
			'/projects',
			[{ key: 'active', value: 'true' }],
			{ token: storeData.token, type: storeData.type }
		),
		getRequestWithQueryString(
			'/budget-items',
			[{ key: 'accumulates', value: 'false' },{key: 'sort', value: 'name'}],
			{ token: storeData.token, type: storeData.type }
		),
	]);

	setProjects(projectResponse.data.detail);
	setBudgetItems(budgetItemResponse.data.detail);
	setIsLoading(false);
};

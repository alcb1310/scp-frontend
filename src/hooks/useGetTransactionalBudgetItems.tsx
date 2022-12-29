import { BudgetItemType, StoreDataType } from '../types';
import { useEffect, useState } from 'react';
import { getRequestWithQueryString } from '../api/getRequest';
import { queryParamsType } from '../types/queryParamsType';

export const useGetTransactionalBudgetItems = (
	storeData: StoreDataType,
	setIsLoading: any
): BudgetItemType[] => {
	const [budgetItems, setBudgetItems] = useState<BudgetItemType[]>([]);

	const fetchData = async () => {
		setIsLoading(true);
		const params: queryParamsType[] = [
			{
				key: 'accumulates',
				value: 'false',
			},
			{
				key: 'sort',
				value: 'name',
			},
		];
		const budgetItemsResponse = await getRequestWithQueryString(
			'/budget-items',
			params,
			{ token: storeData.token, type: storeData.type }
		);
		setBudgetItems(budgetItemsResponse.data.detail);

		setIsLoading(false);
	};

	useEffect(() => {
		fetchData().catch((err) => {
			console.error(err);
		});
	}, []);

	return budgetItems;
};

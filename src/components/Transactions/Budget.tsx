import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, getRequestWithQueryString } from '../../api/connection';
import { DisplayStatusType, StoreDataType, BudgetType } from '../../types';
import { Loading } from '../Elements/Loading';
import { BudgetHomeData, BudgetAddData } from '../../helpers/Budget';
import { BudgetEditData } from '../../helpers/Budget/BudgetEditData';

const Budget = () => {
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [budgets, setBudgets] = useState<BudgetType[]>([]);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);
	const [selectedBudget, setSelectedBudget] = useState<BudgetType | null>(
		null
	);

	const fetchData = async () => {
		setIsLoading(true);
		const budgetsResponse = await getRequest('/budgets', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setBudgets(budgetsResponse.data.detail);
		setIsLoading(false);
	};

	const addBudget = () => {
		setInfoToDisplay('add');
	};

	const saveBudget = async () => {
		await fetchData();
		setInfoToDisplay('home');
	};

	const editBudget = async (budgetUuid: string) => {
		setIsLoading(true);
		const budgetsResponse = await getRequest('/budgets', budgetUuid, {
			token: storeData.token,
			type: storeData.type,
		});
		setSelectedBudget(budgetsResponse.data.detail);
		setIsLoading(false);
		setInfoToDisplay('edit');
	};

	const handleSearchBarSubmit = async (
		event: FormEvent<HTMLFormElement>,
		searchTerms: string
	) => {
		event.preventDefault();
		setIsLoading(true);
		const filteredResponse = await getRequestWithQueryString(
			'/budgets',
			[{ key: 'project', value: searchTerms }],
			{ token: storeData.token, type: storeData.type }
		);
		setBudgets(filteredResponse.data.detail);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const pageToDisplay = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<BudgetHomeData
			budgets={budgets}
			addBudget={addBudget}
			editBudget={editBudget}
			handleSearchBarSubmit={handleSearchBarSubmit}
		/>
	) : infoToDisplay === 'add' ? (
		<BudgetAddData saveBudget={saveBudget} />
	) : (
		<BudgetEditData
			saveBudget={saveBudget}
			selectedBudget={selectedBudget}
		/>
	);

	return <div className='w-full'>{pageToDisplay}</div>;
};

export { Budget };

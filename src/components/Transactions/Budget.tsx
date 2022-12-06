import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, getRequestWithQueryString } from '../../api/connection';
import {
	BudgetItemType,
	DisplayStatusType,
	ProjectType,
	StoreDataType,
} from '../../types';
import { AddButton } from '../Buttons/AddButton';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Loading } from '../Elements/Loading';
import { SearchBar } from '../Inputs/SearchBar';

type budgetType = {
	uuid: string | undefined;
	initial_quantity: null | number;
	initial_cost: null | number;
	initial_total: number;
	spent_quantity: null | number;
	spent_total: number;
	to_spend_quantity: null | number;
	to_spend_cost: null | number;
	to_spend_total: number;
	updated_budget: number;
	project: ProjectType;
	budget_item: BudgetItemType;
};

const Budget = () => {
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [budgets, setBudgets] = useState<budgetType[]>([]);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
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
			handleSearchBarSubmit={handleSearchBarSubmit}
		/>
	) : (
		''
	);

	return <div className='w-full'>{pageToDisplay}</div>;
};

export { Budget };

const BudgetHomeData = ({
	budgets,
	addBudget,
	handleSearchBarSubmit,
}: {
	budgets: budgetType[];
	addBudget: any;
	handleSearchBarSubmit: any;
}) => {
	const [searchTerms, setSearchTerms] = useState<string>('');
	const searchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		console.log(searchTerms);

		setSearchTerms(value);
	};

	const budgetDisplayData = budgets.map((budget) => {
		return (
			<tr key={budget.uuid} className='hover:bg-indigo-100'>
				<td className='border-x-2 p-3'>{budget.budget_item.code}</td>
				<td className='border-x-2 p-3'>{budget.budget_item.name}</td>
				<td className='border-x-2 p-3 text-right'>
					{budget.spent_quantity !== null
						? budget.spent_quantity.toFixed(2)
						: ''}
				</td>
				<td className='border-x-2 p-3 text-right'>
					{budget.spent_total.toFixed(2)}
				</td>
				<td className='border-x-2 p-3 text-right'>
					{budget.to_spend_quantity !== null
						? budget.to_spend_quantity.toFixed(2)
						: ''}
				</td>
				<td className='border-x-2 p-3 text-right'>
					{budget.to_spend_cost !== null
						? budget.to_spend_cost.toFixed(2)
						: ''}
				</td>
				<td className='border-x-2 p-3 text-right'>
					{budget.to_spend_total.toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</td>
			</tr>
		);
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		handleSearchBarSubmit(event, searchTerms);
	};

	return (
		<table className='mt-2 mx-auto table-auto'>
			<caption className='text-left text-2xl font-semibold uppercase pb-5 '>
				<div className='flex justify-between items-center'>
					<p className=' w-1/4'>Budget</p>
					<div className='text-base relative w-full'>
						<form onSubmit={handleSubmit}>
							<SearchBar
								onChange={searchBarChange}
								value={searchTerms}
							/>
						</form>
					</div>
					<div className='text-base text-right w-1/4'>
						<AddButton
							buttonType={'button'}
							text={'Add'}
							onEvent={addBudget}
						/>
					</div>
				</div>
			</caption>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<th colSpan={2} className='text-center p-3'>
						Budget Item
					</th>
					<th colSpan={2} className='text-center p-3'>
						Spent
					</th>
					<th colSpan={3} className='text-center p-3'>
						To Spend
					</th>
				</tr>
				<tr>
					<th className='text-center p-3'>Code</th>
					<th className='text-center p-3'>Name</th>
					<th className='text-center p-3'>Quantity</th>
					<th className='text-center p-3'>Total</th>
					<th className='text-center p-3'>Quantity</th>
					<th className='text-center p-3'>Cost</th>
					<th className='text-center p-3'>Total</th>
				</tr>
			</thead>
			<tbody>{budgetDisplayData}</tbody>
		</table>
	);
};

import { ChangeEvent, FormEvent, useState } from 'react';
import { AddButton } from '../../components/Buttons/AddButton';
import { SearchBar } from '../../components/Inputs/SearchBar';
import { BudgetType } from '../../types';

export const BudgetHomeData = ({
	budgets,
	addBudget,
	editBudget,
	handleSearchBarSubmit,
}: {
	budgets: BudgetType[];
	addBudget: any;
	editBudget: any;
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
			<tr
				key={budget.uuid}
				className='hover:bg-indigo-100'
				onClick={() => {
					editBudget(budget.uuid);
				}}
			>
				<td className='border-x-2 p-3'>{budget.project.name}</td>
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
					<th rowSpan={2} className='text-center p-3'>
						Project
					</th>
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { BudgetItemType } from '../../types';

export const BudgetHomeData = ({
	budgetItems,
	addBudgetItem,
	editBudgetItem,
}: {
	budgetItems: BudgetItemType[];
	addBudgetItem: any;
	editBudgetItem: any;
}) => {
	const budgetItemsData = budgetItems.map((budgetItem) => {
		return (
			<tr
				className='hover:bg-indigo-100'
				key={budgetItem.uuid}
				onClick={() => {
					editBudgetItem(budgetItem.uuid);
				}}
			>
				<td className='border-x-2 p-3'>{budgetItem.code}</td>
				<td className='border-x-2 p-3'>{budgetItem.name}</td>
				<td className='border-x-2 p-3'>{budgetItem.level}</td>
				<td className='border-x-2 p-3 text-center'>
					<FontAwesomeIcon
						icon={budgetItem.accumulates ? faCheck : faXmark}
					/>
				</td>
				<td className='border-x-2 p-3'>
					{budgetItem.parent ? budgetItem.parent.code : ''}
				</td>
			</tr>
		);
	});

	return (
		<>
			<table className='mt-2 mx-auto table-auto'>
				<caption className='text-left text-2xl font-semibold uppercase pb-5'>
					<div className='flex justify-between items-center'>
						<p>Budget Items</p>
						<div className='text-base'>
							<PrimaryButton
								buttonType={'button'}
								text={'Add'}
								onEvent={addBudgetItem}
							/>
						</div>
					</div>
				</caption>
				<thead className='border-b-2 border-black font-bold bg-indigo-200'>
					<tr>
						<th className='text-center p-3'>Code</th>
						<th className='text-center p-3'>Name</th>
						<th className='text-center p-3'>Level</th>
						<th className='text-center p-3'>Accumulates</th>
						<th className='text-center p-3'>Parent</th>
					</tr>
				</thead>
				<tbody className='border-b-2'>{budgetItemsData}</tbody>
			</table>
		</>
	);
};

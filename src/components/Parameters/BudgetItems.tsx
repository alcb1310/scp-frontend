import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest } from '../../api/connection';
import { DisplayStatusType, StoreDataType } from '../../types';

type budgetItemType = {
	uuid: string;
	code: string;
	name: string;
	level: number;
	accumulates: boolean;
	parent: null | {
		uuid: string;
		code: string;
		name: string;
		level: number;
		accumulates: boolean;
		parentUuid: string;
	};
};

const BudgetItems = () => {
	const [budgetItems, setBudgetItems] = useState<budgetItemType[]>([]);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');

	const fetchData = async () => {
		const budgetData = await getRequest('/budget-items', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setBudgetItems(budgetData.data.detail);
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const info =
		infoToDisplay === 'home' ? (
			<BudgetHomeData budgetItems={budgetItems} />
		) : (
			''
		);

	return (
		<>
			<div className='w-full'>{info}</div>
		</>
	);
};

export { BudgetItems };

const BudgetHomeData = ({ budgetItems }: { budgetItems: budgetItemType[] }) => {
	const budgetItemsData = budgetItems.map((budgetItem) => {
		return (
			<tr className='hover:bg-indigo-100' key={budgetItem.uuid}>
				<td className='border-x-2 p-3'>{budgetItem.code}</td>
				<td className='border-x-2 p-3'>{budgetItem.name}</td>
				<td className='border-x-2 p-3'>{budgetItem.level}</td>
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
						<div className='text-base'></div>
					</div>
				</caption>
				<thead className='border-b-2 border-black font-bold bg-indigo-200'>
					<tr>
						<th className='text-center p-3'>Code</th>
						<th className='text-center p-3'>Name</th>
						<th className='text-center p-3'>Level</th>
						<th className='text-center p-3'>Parent</th>
					</tr>
				</thead>
				<tbody className='border-b-2'>{budgetItemsData}</tbody>
			</table>
		</>
	);
};

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, postRequest } from '../../api/connection';
import { DisplayStatusType, ErrorType, StoreDataType } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { InputElement } from '../Inputs/InputElement';
import { SelectElement } from '../Inputs/SelectElement';
import { ChexboxElement } from '../Inputs/CheckboxElement';

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

type createBudgetItemType = {
	uuid: string;
	code: string;
	name: string;
	level: number;
	accumulates: boolean;
	parentUuid: null | string;
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

	const addBudgetItem = () => {
		setInfoToDisplay('add');
	};

	const editBudgetItem = () => {
		setInfoToDisplay('edit');
	};

	const saveBudgetItem = async () => {
		setInfoToDisplay('home');
		await fetchData();
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const info =
		infoToDisplay === 'home' ? (
			<BudgetHomeData
				budgetItems={budgetItems}
				addBudgetItem={addBudgetItem}
			/>
		) : infoToDisplay === 'add' ? (
			<BudgetItemAddData saveBudgetItem={saveBudgetItem} />
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

const BudgetHomeData = ({
	budgetItems,
	addBudgetItem,
}: {
	budgetItems: budgetItemType[];
	addBudgetItem: any;
}) => {
	const budgetItemsData = budgetItems.map((budgetItem) => {
		return (
			<tr className='hover:bg-indigo-100' key={budgetItem.uuid}>
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

const BudgetItemAddData = ({ saveBudgetItem }: { saveBudgetItem: any }) => {
	const [error, setError] = useState<ErrorType | null>(null);
	const [budgetItem, setBudgetItem] = useState<createBudgetItemType | {}>({});
	const [parent, setParent] = useState([]);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const fetchData = async () => {
		const data = await getRequest('/budget-items', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setParent(data.data.detail);
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(budgetItem);
		try {
			await postRequest('/budget-items', budgetItem, {
				token: storeData.token,
				type: storeData.type,
			});

			saveBudgetItem();
		} catch (err: any) {
			console.log(err);
			if (err.response.status === 409)
				setError({
					errorKey: 'code',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = event.target;

		setError(null);

		const changeValue =
			name === 'accumulates'
				? checked
				: name === 'level'
				? parseInt(value)
					? parseInt(value)
					: 0
				: value;

		setBudgetItem((prevBudgetItem) => ({
			...prevBudgetItem,
			[name]: changeValue,
		}));
	};

	return (
		<>
			<form>
				<BudgetItemForm
					error={error}
					handleChange={handleChange}
					budgetItem={budgetItem}
					parents={parent}
				/>
				<PrimaryButton
					buttonType={'submit'}
					text={'Submit'}
					onEvent={handleSubmit}
				/>
			</form>
		</>
	);
};

const BudgetItemForm = ({
	error,
	handleChange,
	budgetItem,
	parents,
}: {
	error: ErrorType | null;
	handleChange: any;
	budgetItem: any;
	parents: any[];
}) => {
	const options = parents.map((parent) => {
		return (
			<option key={parent.uuid} value={parent.uuid}>
				{parent.name}
			</option>
		);
	});

	return (
		<>
			<InputElement
				label={'Code'}
				error={error}
				inputName={'code'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={budgetItem.code}
			/>
			<InputElement
				label={'Name'}
				error={error}
				inputName={'name'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={budgetItem.name}
			/>
			<InputElement
				label={'Level'}
				error={error}
				inputName={'level'}
				required={true}
				inputType={'number'}
				onChange={handleChange}
				value={budgetItem.level}
			/>
			<ChexboxElement
				name={'accumulates'}
				label={'Accumulates'}
				required={true}
				checked={budgetItem.accumulates}
				onChange={handleChange}
			/>
			<SelectElement
				label={'Parent'}
				error={error}
				inputName={'parentUuid'}
				required={true}
				value={budgetItem.parentUuid}
				onChange={handleChange}
			>
				{options}
			</SelectElement>
		</>
	);
};

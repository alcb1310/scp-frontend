import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, postRequest, putRequest } from '../../api/connection';
import { DisplayStatusType, ErrorType, StoreDataType } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { BudgetItemForm } from '../../helpers/BudgetItems';
import { Loading } from '../Elements/Loading';

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
	const [selectedBudgetItem, setSelectedBudgetItem] = useState<
		budgetItemType | {}
	>({});
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async () => {
		setIsLoading(true);
		const budgetData = await getRequest('/budget-items', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setBudgetItems(budgetData.data.detail);
		setIsLoading(false);
	};

	const addBudgetItem = () => {
		setInfoToDisplay('add');
	};

	const editBudgetItem = async (budgetItemUuid: string) => {
		setIsLoading(true);
		const selectedBudgetItemResponse = await getRequest(
			'/budget-items',
			budgetItemUuid,
			{ token: storeData.token, type: storeData.type }
		);

		setIsLoading(false);
		setSelectedBudgetItem(selectedBudgetItemResponse.data.detail);

		setInfoToDisplay('edit');
	};

	const saveBudgetItem = async () => {
		setInfoToDisplay('home');
		await fetchData();
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const info = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<BudgetHomeData
			budgetItems={budgetItems}
			addBudgetItem={addBudgetItem}
			editBudgetItem={editBudgetItem}
		/>
	) : infoToDisplay === 'add' ? (
		<BudgetItemAddData saveBudgetItem={saveBudgetItem} />
	) : 'uuid' in selectedBudgetItem ? (
		<BudgetItemEditData
			saveBudgetItem={saveBudgetItem}
			budgetItem={selectedBudgetItem}
		/>
	) : (
		'Unable to find budget item'
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
	editBudgetItem,
}: {
	budgetItems: budgetItemType[];
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
			if (err.response.status === 409)
				setError({
					errorKey: 'code',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
			console.error(err);
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

const BudgetItemEditData = ({
	saveBudgetItem,
	budgetItem,
}: {
	saveBudgetItem: any;
	budgetItem: budgetItemType;
}) => {
	const [budgetItemToEdit, setBudgetItemToEdit] = useState<
		createBudgetItemType | {}
	>({});
	const [error, setError] = useState<ErrorType | null>(null);
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
		setBudgetItemToEdit(() => {
			return {
				uuid: budgetItem.uuid,
				code: budgetItem.code,
				name: budgetItem.name,
				level: budgetItem.level,
				accumulates: budgetItem.accumulates,
				parentUuid:
					budgetItem.parent && 'uuid' in budgetItem.parent
						? budgetItem.parent.uuid
						: null,
			};
		});
		fetchData().catch((err) => console.error(err));
	}, []);

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

		setBudgetItemToEdit((prevBudgetItemToEdit) => ({
			...prevBudgetItemToEdit,
			[name]: changeValue,
		}));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			'uuid' in budgetItemToEdit &&
				(await putRequest(
					'/budget-items',
					budgetItemToEdit.uuid,
					budgetItemToEdit,
					{ token: storeData.token, type: storeData.type }
				));
			saveBudgetItem();
		} catch (err: any) {
			if (err.response.status === 409)
				setError({
					errorKey: 'code',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<BudgetItemForm
				error={error}
				handleChange={handleChange}
				budgetItem={budgetItemToEdit}
				parents={parent}
			/>
			<PrimaryButton
				buttonType={'submit'}
				text={'Submit'}
				onEvent={handleSubmit}
			/>
		</form>
	);
};

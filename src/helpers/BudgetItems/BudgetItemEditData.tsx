import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, putRequest } from '../../api/connection';
import {
	ErrorType,
	StoreDataType,
	BudgetItemType,
	CreateBudgetItemType,
} from '../../types';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { BudgetItemForm } from '.';

export const BudgetItemEditData = ({
	saveBudgetItem,
	budgetItem,
}: {
	saveBudgetItem: any;
	budgetItem: BudgetItemType;
}) => {
	const [budgetItemToEdit, setBudgetItemToEdit] = useState<
		CreateBudgetItemType | {}
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

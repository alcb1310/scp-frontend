import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	getRequest,
	getRequestWithQueryString,
	postRequest,
} from '../../api/connection';
import { ErrorType, StoreDataType, CreateBudgetItemType } from '../../types';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { BudgetItemForm } from '.';
import { queryParamsType } from '../../types/queryParamsType';

export const BudgetItemAddData = ({
	saveBudgetItem,
}: {
	saveBudgetItem: any;
}) => {
	const [error, setError] = useState<ErrorType | null>(null);
	const [budgetItem, setBudgetItem] = useState<CreateBudgetItemType | {}>({
		accumulates: false,
	});
	const [parent, setParent] = useState([]);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const fetchData = async () => {
		const params: queryParamsType[] = [
			{
				key: 'accumulates',
				value: 'true',
			},
			{
				key: 'sort',
				value: 'name',
			},
		];
		const data = await getRequestWithQueryString('/budget-items', params, {
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

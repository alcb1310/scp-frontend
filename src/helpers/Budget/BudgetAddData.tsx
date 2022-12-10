import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postRequest, fetchProjectsAndBudgetItems } from '../../api/connection';
import {
	BudgetItemType,
	ErrorType,
	ProjectType,
	StoreDataType,
	BudgetFormType,
} from '../../types';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { Loading } from '../../components/Elements/Loading';
import { BudgetFormData } from '.';

export const BudgetAddData = ({ saveBudget }: { saveBudget: any }) => {
	const [addedBudget, setAddedBudget] = useState<BudgetFormType>({
		uuid: '',
		project_id: '',
		budget_item_id: '',
		quantity: 0,
		cost: 0,
	});
	const [error, setError] = useState<ErrorType | null>(null);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [budgetItems, setBudgetItems] = useState<BudgetItemType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const storeData = useSelector((state: StoreDataType) => state);

	useEffect(() => {
		fetchProjectsAndBudgetItems(
			storeData,
			setIsLoading,
			setProjects,
			setBudgetItems
		).catch((err) => console.error(err));
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			await postRequest('/budgets', addedBudget, {
				token: storeData.token,
				type: storeData.type,
			});
		} catch (err: any) {
			if (err.response.status === 409)
				setError({
					errorKey: 'project_id',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
			console.error(err);
			return;
		} finally {
			setIsLoading(false);
		}
		saveBudget();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, valueAsNumber } = event.target;
		setError(null);

		const saveValue =
			type === 'number' && !isNaN(valueAsNumber) ? valueAsNumber : value;

		setAddedBudget((prevBudget) => ({ ...prevBudget, [name]: saveValue }));
	};

	const dataToDisplay = isLoading ? (
		<Loading />
	) : (
		<form onSubmit={handleSubmit}>
			<BudgetFormData
				budget={addedBudget}
				error={error}
				projects={projects}
				budgetItems={budgetItems}
				onChange={handleChange}
			/>
			<PrimaryButton
				buttonType={'submit'}
				text={'Submit'}
				onEvent={handleSubmit}
			/>
		</form>
	);

	return dataToDisplay;
};

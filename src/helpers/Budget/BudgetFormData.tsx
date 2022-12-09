import {
	BudgetItemType,
	ErrorType,
	ProjectType,
	BudgetFormType,
} from '../../types';
import { InputElement, SelectElement } from '../../components/Inputs';

export const BudgetFormData = ({
	budget,
	error,
	projects,
	budgetItems,
	onChange,
}: {
	budget: BudgetFormType;
	error: ErrorType | null;
	projects: ProjectType[];
	budgetItems: BudgetItemType[];
	onChange: any;
}) => {
	const budgetItemOptions = budgetItems.map((budgetItem) => (
		<option key={budgetItem.uuid} value={budgetItem.uuid}>
			{budgetItem.name}
		</option>
	));
	const projectOptions = projects.map((project) => (
		<option key={project.uuid} value={project.uuid}>
			{project.name}
		</option>
	));

	return (
		<>
			<SelectElement
				label={'Project'}
				error={error}
				inputName={'project_id'}
				required={true}
				value={budget.project_id}
				onChange={onChange}
			>
				{projectOptions}
			</SelectElement>
			<SelectElement
				label={'Budget Item'}
				error={error}
				inputName={'budget_item_id'}
				required={true}
				value={budget.budget_item_id}
				onChange={onChange}
			>
				{budgetItemOptions}
			</SelectElement>
			<InputElement
				label={'Quantity'}
				error={error}
				inputName={'quantity'}
				required={true}
				inputType={'number'}
				onChange={onChange}
				value={budget.quantity}
				enabled={true}
			/>
			<InputElement
				label={'Cost'}
				error={error}
				inputName={'cost'}
				required={true}
				inputType={'number'}
				onChange={onChange}
				value={budget.cost}
				enabled={true}
			/>
			<InputElement
				label={'Total'}
				error={error}
				inputName={'total'}
				required={true}
				inputType={'number'}
				onChange={onChange}
				value={(budget.cost * budget.quantity).toFixed(2)}
				enabled={false}
			/>
		</>
	);
};

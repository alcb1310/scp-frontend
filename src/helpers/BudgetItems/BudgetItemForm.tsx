import { ErrorType } from '../../types';
import {
	InputElement,
	SelectElement,
	ChexboxElement,
} from '../../components/Inputs';

export const BudgetItemForm = ({
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
				required={false}
				checked={budgetItem.accumulates}
				onChange={handleChange}
			/>
			<SelectElement
				label={'Parent'}
				error={error}
				inputName={'parentUuid'}
				required={false}
				value={budgetItem.parentUuid}
				onChange={handleChange}
			>
				{options}
			</SelectElement>
		</>
	);
};

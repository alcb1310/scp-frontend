import { ErrorType } from '../../types';
import { CheckboxElement, InputElement } from '../../components/Inputs';
import { projectType } from '../../components/Parameters/Project';

const ProjectForm = ({
	error,
	onChange,
	project,
}: {
	error: ErrorType | null;
	onChange: any;
	project: projectType | null;
}) => {
	return (
		<>
			<InputElement
				label={'Name'}
				error={error}
				inputName={'name'}
				required={true}
				inputType={'text'}
				onChange={onChange}
				value={project ? project.name : ''}
			/>
			<CheckboxElement
				name={'is_active'}
				label={'Active'}
				required={false}
				checked={project ? project.is_active : false}
				onChange={onChange}
			/>
		</>
	);
};

export { ProjectForm}
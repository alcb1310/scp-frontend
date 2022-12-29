import { ErrorType, CreateUserType } from '../../types';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { InputElement } from '../Inputs/InputElement';

export const UserForm = ({
	handleSubmit,
	error,
	handleChange,
	user,
}: {
	handleSubmit: any;
	error: ErrorType | null;
	handleChange: any;
	user: {} | CreateUserType;
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<InputElement
				label={'Email'}
				error={error}
				inputName={'email'}
				required={true}
				inputType={'email'}
				onChange={handleChange}
				value={'email' in user ? user.email : ''}
				enabled={true}
			/>
			<InputElement
				label={'Password'}
				error={error}
				inputName={'password'}
				required={true}
				inputType={'password'}
				onChange={handleChange}
				value={'password' in user ? user.password : ''}
				enabled={true}
			/>
			<InputElement
				label={'Name'}
				error={error}
				inputName={'name'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={'name' in user ? user.name : ''}
				enabled={true}
			/>

			<PrimaryButton
				buttonType={'submit'}
				text={'Submit'}
				onEvent={handleSubmit}
			/>
		</form>
	);
};

import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { postRequest } from '../../api/connection';
import { StoreDataType } from '../../types';
import { errorType } from '../../types/ErrorType';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { InputElement } from '../Inputs/InputElement';

type createUserType = {
	email: string;
	password: string;
	name: string;
};

const CreateUser = (props: { successEvent: any }) => {
	const [error, setError] = useState<errorType | null>(null);
	const [user, setUser] = useState<createUserType | {}>({});
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const { successEvent } = props;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await postRequest('/users', user, {
				token: storeData.token,
				type: storeData.type,
			});

			successEvent();
		} catch (err: any) {
			if (err.response.status === 400) setError(err.response.data.detail);
			if (err.response.status === 403)
				setError({
					errorKey: 'email',
					errorDescription: err.response.data.detail,
				});
			if (err.response.status === 409)
				setError({
					errorKey: 'email',
					errorDescription: err.response.data.detail,
				});
		}
	};

	return (
		<>
			<h2 className='mt-4 text-lg uppercase font-semibold font-sans'>
				Create User
			</h2>

			<form onSubmit={handleSubmit}>
				<InputElement
					label={'Email'}
					error={error}
					inputName={'email'}
					required={true}
					inputType={'email'}
					onChange={handleChange} 
					value={('email' in user) ? user.email : ''}				
				/>
				<InputElement
					label={'Password'}
					error={error}
					inputName={'password'}
					required={true}
					inputType={'password'}
					onChange={handleChange}
					value={('password' in user) ? user.password : ''}
				/>
				<InputElement
					label={'Name'}
					error={error}
					inputName={'name'}
					required={true}
					inputType={'text'}
					onChange={handleChange}
					value={('name' in user) ? user.name : ''}
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

export { CreateUser };

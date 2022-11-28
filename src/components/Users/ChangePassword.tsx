import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { putRequest } from '../../api/connection';
import { errorType } from '../../types/ErrorType';
import { InputElement } from '../Inputs/InputElement';
import { StoreDataType } from '../../types';
import { PrimaryButton } from '../Buttons/PrimaryButton';

type changePasswordType = {
	password1: string;
	password2: string;
};

const ChangePassword = () => {
	const [error, setError] = useState<errorType | null>(null);
	const [password, setPassword] = useState<changePasswordType | {}>({});
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        setError(null)

		if (!('password1' in password)) {
			setError({
				errorKey: 'password1',
				errorDescription: 'Required field',
			});
			return;
		}
		if (!('password2' in password)) {
			setError({
				errorKey: 'password2',
				errorDescription: 'Required field',
			});
			return;
		}

		if (password.password1 !== password.password2) {
			setError({
				errorKey: 'password1',
				errorDescription: `Passwords don't match`,
			});
		}

		try {
			const putResponse = await putRequest(
				'/users',
				storeData.uuid,
				{ password: password.password1 },
				{ token: storeData.token, type: storeData.type }
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<h2>Change Password</h2>
			<form onSubmit={handleSubmit}>
				<InputElement
					label={'Password'}
					error={error}
					inputName={'password1'}
					required={true}
					inputType={'password'}
					onChange={handleChange}
				/>
				<InputElement
					label={'Repeat Password'}
					error={error}
					inputName={'password2'}
					required={true}
					inputType={'password'}
					onChange={handleChange}
				/>
                <PrimaryButton buttonType={'submit'} text={'Submit'} onEvent={handleSubmit}  />
			</form>
		</>
	);
};

export { ChangePassword };

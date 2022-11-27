import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../api/connection';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';
import { Footer } from '../components/Elements/Footer';
import { InputElement } from '../components/Inputs/InputElement';
import { ErrorType, RegistrationType } from '../types';

const Register = () => {
	const [registration, setRegistration] = useState<RegistrationType | {}>({});
	const [error, setError] = useState<ErrorType | null>(null);
	const navigate = useNavigate();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setRegistration((prevRegistration) => {
			if (name === 'plan')
				return { ...prevRegistration, employees: parseInt(value) };

			return { ...prevRegistration, [name]: value };
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		try {
			const response = await postRequest('/companies', registration);

			navigate('/login');
		} catch (err: any) {
			if (err.response.status === 400) setError(err.response.data.detail);
			if (err.response.status === 409)
				setError({
					errorKey: 'ruc',
					errorDescription: err.response.data.detail,
				});
		}
	};

	return (
		<div className="bg-[url('/images/register-background-30.png')] h-screen bg-cover bg-opacity-30">
			<h1 className='text-4xl uppercase font-bold text-indigo-800 text-center pt-4'>
				Register
			</h1>

			<div className='container w-1/3 mx-auto mt-5 mb-5'>
				<form className='text-indigo-600' onSubmit={handleSubmit}>
					<h3 className='font-bold text-lg mt-8'>
						Company Information
					</h3>
					<InputElement
						label='RUC'
						error={error}
						inputName='ruc'
						required={true}
						onChange={handleChange}
						inputType='text'
					/>
					<InputElement
						label='Name'
						error={error}
						inputName='name'
						required={true}
						onChange={handleChange}
						inputType='text'
					/>

					<label className='block mt-4 mb-2'>
						Choose your plan <span className='text-red-600'>*</span>
					</label>
					<div
						className={`flex space-x-4 ${
							error !== null &&
							error.errorKey === 'employees' &&
							'border-red-600 border-2 rounded-md'
						}`}
						onChange={handleChange}
					>
						<div className='my-1'>
							<input
								type='radio'
								name='plan'
								id='starter'
								value={5}
							/>
							<label htmlFor='starter' className='ml-2'>
								Entry Level
							</label>
						</div>
						<div className='my-1'>
							<input
								type='radio'
								name='plan'
								id='mid-level'
								value={10}
							/>
							<label htmlFor='mid-level' className='ml-2'>
								Mid Level
							</label>
						</div>
					</div>
					{error !== null && error.errorKey === 'employees' && (
						<p className='text-red-600 text-sm'>
							{error.errorDescription}
						</p>
					)}

					<h3 className='font-bold text-lg mt-8'>
						Admin User Information
					</h3>
					<InputElement
						label='Email'
						error={error}
						inputName='email'
						required={true}
						onChange={handleChange}
						inputType='email'
					/>
					<InputElement
						label='Password'
						error={error}
						inputName='password'
						required={true}
						onChange={handleChange}
						inputType='password'
					/>
					<InputElement
						label='Full name'
						error={error}
						inputName='fullname'
						required={true}
						onChange={handleChange}
						inputType='text'
					/>

					<PrimaryButton
						buttonType={'submit'}
						text={'Submit'}
						onEvent={handleSubmit}
					/>
					<SecondaryButton
						buttonType='reset'
						text='Reset'
						onEvent={null}
					/>

					<div className='text-sm mt-2'>
						<span className='text-red-600'>*</span> Required field
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export { Register };

// "ruc": "12345678920",
// "name": "Testing Company 2",
// "employees": 5,
// "email": "a@be.c",
// "password": "pasd",
// "fullname": "Test User"

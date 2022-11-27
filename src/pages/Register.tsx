import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../api/connection';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { Footer } from '../components/Elements/Footer';
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
			<h1 className='text-4xl uppercase font-bold text-blue-800 text-center pt-4'>
				Register
			</h1>

			<div className='container w-1/3 mx-auto mt-5 mb-5'>
				<form className='text-blue-700' onSubmit={handleSubmit}>
					<h3 className='font-bold text-lg mt-8'>
						Company Information
					</h3>
					<label className='block mt-4 mb-2' htmlFor='ruc'>
						RUC: <span className='text-red-600'>*</span>
					</label>
					<input
						className={`block w-full px-3 py-1 rounded-md ${
							error !== null &&
							error.errorKey === 'ruc' &&
							'border-red-600 border-2'
						}`}
						name='ruc'
						id='ruc'
						type='text'
						placeholder='RUC'
						required
						onChange={handleChange}
						value={'ruc' in registration ? registration.ruc : ''}
					/>
					{error !== null && error.errorKey === 'ruc' && (
						<p className='text-red-600 text-sm'>
							{error.errorDescription}
						</p>
					)}
					<label className='block mt-4 mb-2' htmlFor='name'>
						Name: <span className='text-red-600'>*</span>
					</label>
					<input
						className={`block w-full px-3 py-1 rounded-md ${
							error !== null &&
							error.errorKey === 'name' &&
							'border-red-600 border-2'
						}`}
						name='name'
						id='name'
						type='text'
						placeholder='Company Name'
						required
						onChange={handleChange}
						value={'name' in registration ? registration.name : ''}
					/>
					{error !== null && error.errorKey === 'name' && (
						<p className='text-red-600 text-sm'>
							{error.errorDescription}
						</p>
					)}

					<label
						className='block mt-4 mb-2
					'
					>
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
					<label className='block mt-4 mb-2' htmlFor='email'>
						Email: <span className='text-red-600'>*</span>
					</label>
					<input
						className={`block w-full px-3 py-1 rounded-md ${
							error !== null &&
							error.errorKey === 'email' &&
							'border-red-600 border-2'
						}`}
						type='email'
						name='email'
						id='email'
						placeholder='Email'
						required
						onChange={handleChange}
						value={
							'email' in registration ? registration.email : ''
						}
					/>
					{error !== null && error.errorKey === 'email' && (
						<p className='text-red-600 text-sm'>
							{error.errorDescription}
						</p>
					)}
					<label className='block mt-4 mb-2' htmlFor='password'>
						Password: <span className='text-red-600'>*</span>
					</label>
					<input
						className={`block w-full px-3 py-1 rounded-md ${
							error !== null &&
							error.errorKey === 'password' &&
							'border-red-600 border-2'
						}`}
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						required
						onChange={handleChange}
						value={
							'password' in registration
								? registration.password
								: ''
						}
					/>
					{error !== null && error.errorKey === 'password' && (
						<p className='text-red-600 text-sm'>
							{error.errorDescription}
						</p>
					)}

					<label className='block mt-4 mb-2' htmlFor='fullname'>
						Full name: <span className='text-red-600'>*</span>
					</label>
					<input
						onChange={handleChange}
						value={
							'fullname' in registration
								? registration.fullname
								: ''
						}
						className='block w-full px-3 py-1 rounded-md'
						type='text'
						name='fullname'
						id='fullname'
						placeholder='Full name'
						required
					/>

					<PrimaryButton
						buttonType={'submit'}
						text={'Submit'}
						onEvent={handleSubmit}
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

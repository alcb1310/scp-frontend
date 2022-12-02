import { ChangeEvent, FormEvent, useState } from 'react';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';
import { InputElement } from '../components/Inputs/InputElement';
import { ErrorType } from '../types';
import { postRequest } from '../api/connection'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type loginInfoType = {
    email: string,
    password: string
}

const Login = () => {
	const [error, setError] = useState<ErrorType | null>(null);
    const [loginInfo, setLoginInfo] = useState<loginInfoType | {}>({})
    const token = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        setError(null)
        dispatch({type: 'LOGOUT'})
        try {
            const logIn = await postRequest('/login', loginInfo)
            dispatch({type: 'LOGIN', payload:{
                token: logIn.data.token,
                type: logIn.data.type
            }})
            
            navigate('/app')
        } catch (err: any) {
            if (err.response.status === 401) setError({errorKey: 'email', errorDescription: err.response.data.detail})
            else console.error(err)
        }
	};
    

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setLoginInfo(prevLoginInfo => ({...prevLoginInfo, [name]: value}))
    };

    const handleReset = () => {
        setLoginInfo({})
    }

	return (
		<>
			<div className='container w-1/3 mx-auto h-screen object-center relative flex flex-col content-center justify-center'>
					<h1 className='text-4xl uppercase font-bold text-indigo-800 text-center pt-4'>
						Login
					</h1>

					<form onSubmit={handleSubmit}>
						<InputElement
							label='Email'
							error={error}
							inputType='email'
							inputName='email'
							required={true}
							onChange={handleChange}
							value = {('email' in loginInfo) ? loginInfo.email : ''}
						/>
                        <InputElement label='Password' error={error} inputType='password' inputName='password' required={true} onChange={handleChange} value={('password' in loginInfo) ? loginInfo.password : ''} />

						<PrimaryButton
							buttonType='submit'
							text='Submit'
							onEvent={handleSubmit}
						/>
                        <SecondaryButton buttonType='reset' text='Reset' onEvent={handleReset} />
					</form>
			</div>
		</>
	);
};

export { Login };

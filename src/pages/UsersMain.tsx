import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest } from '../api/connection';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { ChangePassword } from '../components/Users/ChangePassword';
import { CreateUser } from '../components/Users/CreateUser';

type userActivePageType = 'create' | 'update' | 'reset' | null;
type getUserType = {
	uuid: string;
	email: string;
	name: string;
	company: {
		uuid: string;
		ruc: string;
		name: string;
		employees: number;
	};
};

const UsersMain = () => {
	const [activePage, setActivePage] = useState<userActivePageType>(null);
	const [users, setUsers] = useState<getUserType[]>([]);
	const storeData = useSelector((state: any) => state);

	const getAllUsers = async (): Promise<AxiosResponse> => {
		const users: AxiosResponse = await getRequest('/users', null, {
			token: storeData.token,
			type: storeData.type,
		});

		return users;
	};

	useEffect(() => {
		getAllUsers().then((data) => {
			setUsers(data.data.detail);
		});
	}, []);

	const handleSuccess = async () => {
		setActivePage(null);

		const userResponse = await getAllUsers()
		setUsers(userResponse.data.detail)
	};

	const usersEl = users.map((user: getUserType) => {
		return (
			<tr className='hover:bg-indigo-100' key={user.uuid}>
				<td className='border-x-2 p-3'>{user.email}</td>
				<td className='border-x-2 p-3'>{user.name}</td>
			</tr>
		);
	});

	const showPage =
		activePage === 'reset' ? (
			<ChangePassword />
		) : activePage === 'create' ? (
			<CreateUser successEvent={handleSuccess} />
		) : (
			<div className='w-full'>
				<table className='mt-4 mx-auto'>
					<thead className='border-b-2 border-black font-bold bg-indigo-200'>
						<tr>
							<td className='text-center w-4/12 p-3'>Email</td>
							<td className='text-center w-4/12 p-3'>Name</td>
						</tr>
					</thead>
					<tbody className='border-b-2'>{usersEl}</tbody>
				</table>
			</div>
		);

	return (
		<section className='grid grid-cols-12 text-indigo-800 px-5 min-h-96 space-x-6 mb-5'>
			<article className='col-span-9'>{showPage}</article>
			<aside className='col-span-3 my-3 text-right flex flex-col'>
				<PrimaryButton
					buttonType='button'
					text={'Change Password'}
					onEvent={() => {
						setActivePage('reset');
					}}
				/>
				<PrimaryButton
					buttonType='button'
					text={'Create User'}
					onEvent={() => {
						setActivePage('create');
					}}
				/>
				<PrimaryButton
					buttonType='button'
					text={'Update User'}
					onEvent={() => {
						setActivePage('update');
					}}
				/>
			</aside>
		</section>
	);
};

export { UsersMain };

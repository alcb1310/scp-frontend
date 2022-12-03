import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, postRequest, putRequest } from '../../api/connection';
import { StoreDataType } from '../../types';
import { errorType } from '../../types/ErrorType';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SupplierForm } from '../Elements/SupplierForm';

export type getSuppliersType = {
	uuid: string;
	supplier_id: string;
	name: string;
	contact_name: string;
	contact_email: string;
	contact_phone: string;
};

type displayStatus = 'home' | 'add' | 'edit';

const Supplier = () => {
	const [suppliers, setSuppliers] = useState<getSuppliersType[]>([]);
	const [supplierUuid, setSupplierUuid] = useState<string>('');
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const [infoToDisplay, setInfoToDisplay] = useState<displayStatus>('home');

	const fetchData = async () => {
		const data = await getRequest('/suppliers', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setSuppliers(data.data.detail);
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const addSupplier = () => {
		setInfoToDisplay('add');
	};

	const saveSupplier = async () => {
		setInfoToDisplay('home');
		await fetchData();
	};

	const editSupplier = (supplierUuid: string) => {
		setSupplierUuid(supplierUuid);
		setInfoToDisplay('edit');
	};

	const info =
		infoToDisplay === 'home' ? (
			<SupplierHomeData
				suppliers={suppliers}
				addSupplier={addSupplier}
				editSupplier={editSupplier}
			/>
		) : infoToDisplay === 'add' ? (
			<SupplierAddData saveSupplier={saveSupplier} />
		) : (
			<SupplierEditData
				saveSupplier={saveSupplier}
				supplierUuid={supplierUuid}
			/>
		);

	return (
		<>
			<div className='w-full'>{info}</div>
		</>
	);
};

export { Supplier };

const SupplierHomeData = (props: {
	suppliers: getSuppliersType[];
	addSupplier: any;
	editSupplier: any;
}) => {
	const { suppliers, addSupplier, editSupplier } = props;

	const supplierData = suppliers.map((supplier: getSuppliersType) => {
		return (
			<tr
				className='hover:bg-indigo-100'
				key={supplier.uuid}
				onClick={() => {
					editSupplier(supplier.uuid);
				}}
			>
				<td className='border-x-2 p-3'>{supplier.supplier_id}</td>
				<td className='border-x-2 p-3'>{supplier.name}</td>
				<td className='border-x-2 p-3'>{supplier.contact_name}</td>
				<td className='border-x-2 p-3'>{supplier.contact_email}</td>
				<td className='border-x-2 p-3'>{supplier.contact_phone}</td>
			</tr>
		);
	});

	return (
		<table className='mt-2 mx-auto table-auto'>
			<caption className='text-left text-2xl font-semibold uppercase pb-5'>
				<div className='flex justify-between items-center'>
					<p>Suppliers</p>
					<div className='text-base'>
						<PrimaryButton
							buttonType={'button'}
							text={'Add'}
							onEvent={addSupplier}
						/>
					</div>
				</div>
			</caption>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<th className='text-center p-3' rowSpan={2}>
						ID
					</th>
					<th className='text-center p-3' rowSpan={2}>
						Name
					</th>
					<th className='text-center p-3' colSpan={3}>
						Contact
					</th>
				</tr>
				<tr>
					<th className='text-center p-3'>Name</th>
					<th className='text-center p-3'>Email</th>
					<th className='text-center p-3'>Phone</th>
				</tr>
			</thead>
			<tbody className='border-b-2'>{supplierData}</tbody>
		</table>
	);
};

const SupplierEditData = ({
	saveSupplier,
	supplierUuid,
}: {
	saveSupplier: any;
	supplierUuid: string;
}) => {
	const [supplier, setSupplier] = useState({});
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);
	const [error, setError] = useState<errorType | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const supplierData = await getRequest(`/suppliers`, supplierUuid, {
				token: storeData.token,
				type: storeData.type,
			});

			console.log(supplierData);
			setSupplier(supplierData.data.detail);
		};

		fetchData().catch((err) => console.error(err));
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await putRequest('/suppliers', supplierUuid, supplier, {
				token: storeData.token,
				type: storeData.type,
			});

			saveSupplier();
		} catch (err: any) {
			console.error(err);
			if (err.response.status === 409)
				setError({
					errorKey: 'supplier_id',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
	};

	return (
		<>
			<h2>Edit</h2>

			<form onSubmit={handleSubmit}>
				<SupplierForm
					supplier={supplier}
					error={error}
					handleChange={handleChange}
				/>
				<PrimaryButton
					buttonType={'submit'}
					text={'submit'}
					onEvent={handleSubmit}
				/>
			</form>
		</>
	);
};

const SupplierAddData = ({ saveSupplier }: { saveSupplier: any }) => {
	const [error, setError] = useState(null);
	const [supplier, setSupplier] = useState({});
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await postRequest('/suppliers', supplier, {
				token: storeData.token,
				type: storeData.type,
			});
			saveSupplier();
		} catch (err: any) {
			setError(() => {
				return err.response.status === 409
					? {
							errorKey: 'supplier_id',
							errorDescription: err.response.data.detail,
					  }
					: err.response.data.detail;
			});
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
	};

	return (
		<>
			<h2>Add</h2>
			<form onSubmit={handleSubmit}>
				<SupplierForm
					supplier={supplier}
					error={error}
					handleChange={handleChange}
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

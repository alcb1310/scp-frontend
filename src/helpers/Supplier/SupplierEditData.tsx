import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, putRequest } from '../../api/connection';
import { StoreDataType, ErrorType } from '../../types';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SupplierForm } from '.';

export const SupplierEditData = ({
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
	const [error, setError] = useState<ErrorType | null>(null);

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

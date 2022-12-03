import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { postRequest } from '../../api/connection';
import { StoreDataType } from '../../types';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SupplierForm } from '.';

export const SupplierAddData = ({ saveSupplier }: { saveSupplier: any }) => {
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

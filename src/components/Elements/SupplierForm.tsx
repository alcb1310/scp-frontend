import { ChangeEventHandler } from 'react';
import { errorType } from '../../types/ErrorType';
import { InputElement } from '../Inputs/InputElement';
import { getSuppliersType } from '../Parameters/Supplier';

export const SupplierForm = ({
	supplier,
	error,
	handleChange,
}: {
	supplier: getSuppliersType | {} | null;
	error: errorType | null;
	handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
	return (
		<>
			<InputElement
				label={'ID'}
				error={error}
				inputName={'supplier_id'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={
					supplier !== null && 'supplier_id' in supplier
						? supplier.supplier_id
						: ''
				}
			/>
			<InputElement
				label={'Name'}
				error={error}
				inputName={'name'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={
					supplier !== null && 'name' in supplier ? supplier.name : ''
				}
			/>
			<InputElement
				label={'Contact Name'}
				error={error}
				inputName={'contact_name'}
				required={false}
				inputType={'text'}
				onChange={handleChange}
				value={
					supplier !== null && 'contact_name' in supplier
						? supplier.contact_name
						: ''
				}
			/>
			<InputElement
				label={'Contact Email'}
				error={error}
				inputName={'contact_email'}
				required={false}
				inputType={'text'}
				onChange={handleChange}
				value={
					supplier !== null && 'contact_email' in supplier
						? supplier.contact_email
						: ''
				}
			/>
			<InputElement
				label={'Contact Phone'}
				error={error}
				inputName={'contact_phone'}
				required={false}
				inputType={'text'}
				onChange={handleChange}
				value={
					supplier !== null && 'contact_phone' in supplier
						? supplier.contact_phone
						: ''
				}
			/>
		</>
	);
};
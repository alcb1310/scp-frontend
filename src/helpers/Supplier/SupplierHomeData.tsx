import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { GetSuppliersType } from '../../types';

export const SupplierHomeData = (props: {
	suppliers: GetSuppliersType[];
	addSupplier: any;
	editSupplier: any;
}) => {
	const { suppliers, addSupplier, editSupplier } = props;

	const supplierData = suppliers.map((supplier: GetSuppliersType) => {
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

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	StoreDataType,
	InvoiceDisplayType,
	InvoiceDetailType,
} from '../../types';
import { Loading } from '../../components/Elements/Loading';
import { fetchDetailData } from '../../api/connection';

export const DisplayDetailData = ({
	invoice,
}: {
	invoice: InvoiceDisplayType | null;
}) => {
	if (!invoice) return <h1>ERROR</h1>;
	const [details, setDetails] = useState<InvoiceDetailType[]>([]);
	const storeData = useSelector((state: StoreDataType) => state);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchDetailData(storeData, invoice.uuid, setIsLoading, setDetails);
	}, []);

	const detailRows = details.map((detail) => {
		return (
			<tr key={detail.uuid}>
				<td className=' p-2 border-x-2 border-b-2'>
					{detail.budgetItem.code}
				</td>
				<td className=' p-2 border-x-2 border-b-2'>
					{detail.budgetItem.name}
				</td>
				<td className='text-right p-2 border-x-2 border-b-2'>
					{detail.quantity.toFixed(2)}
				</td>
				<td className='text-right p-2 border-x-2 border-b-2'>
					{detail.cost.toFixed(2)}
				</td>
				<td className='text-right p-2 border-x-2 border-b-2'>
					{detail.total.toFixed(2)}
				</td>
			</tr>
		);
	});

	const display = isLoading ? (
		<Loading />
	) : (
		<table className='mt-2 mx-auto table-fixed w-full'>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<td className='w-1/5 p-2 text-center'>Code</td>
					<td className='w-2/5 p-2 text-center'>Description</td>
					<td className='w-1/5 p-2 text-center'>Quantity</td>
					<td className='w-1/5 p-2 text-center'>Cost</td>
					<td className='w-1/5 p-2 text-center'>Total</td>
				</tr>
			</thead>
			<tbody>{detailRows}</tbody>
		</table>
	);

	return display;
};

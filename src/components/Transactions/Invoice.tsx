import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest } from '../../api/getRequest';
import {
	DisplayStatusType,
	GetSuppliersType,
	ProjectType,
	StoreDataType,
} from '../../types';
import { AddButton } from '../Buttons/AddButton';
import { Loading } from '../Elements/Loading';

type invoiceDisplayType = {
	uuid: string;
	invoice_number: string;
	date: string;
	total: number;
	project: ProjectType;
	supplier: GetSuppliersType;
};

const useFetchInvoices = (storeData: StoreDataType, setIsLoading: any) => {
	const [invoices, setInvoices] = useState<invoiceDisplayType[]>([]);

	const fetchData = async () => {
		setIsLoading(true);
		const invoicesResult = await getRequest('/invoices', null, {
			token: storeData.token,
			type: storeData.type,
		});
		setInvoices(invoicesResult.data.detail);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData().catch((err) => {
			console.error(err);
		});
	}, []);

	return invoices;
};

const Invoice = () => {
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const storeData = useSelector((state: StoreDataType) => state);

	const invoices = useFetchInvoices(storeData, setIsLoading);

	const addInovice = () => setInfoToDisplay('add');

	const displayData = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<InvoiceHomeData invoices={invoices} addInvoice={addInovice} />
	) : (
		''
	);

	return displayData;
};

export { Invoice };

const InvoiceHomeData = ({
	invoices,
	addInvoice,
}: {
	invoices: invoiceDisplayType[];
	addInvoice: any;
}) => {
	const invoicesToDisplay = invoices.map((invoice) => {
		return (
			<tr className='hover:bg-indigo-100' key={invoice.uuid}>
				<td className='border-x-2 p-3'>{invoice.date}</td>
				<td className='border-x-2 p-3'>{invoice.project.name}</td>
				<td className='border-x-2 p-3'>{invoice.supplier.name}</td>
				<td className='border-x-2 p-3'>{invoice.invoice_number}</td>
				<td className='border-x-2 p-3 text-right'>
					{invoice.total.toFixed(2)}
				</td>
			</tr>
		);
	});

	return (
		<table className='mt-2 mx-auto table-auto'>
			<caption className='text-left text-2xl font-semibold uppercase pb-5 '>
				<div className='flex justify-between items-center'>
					<p className=' w-1/4'>Invoices</p>
					<div className='text-base text-right w-1/4'>
						<AddButton
							buttonType={'button'}
							text={'Add'}
							onEvent={addInvoice}
						/>
					</div>
				</div>
			</caption>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<th className='text-center p-3'>Date</th>
					<th className='text-center p-3'>Project</th>
					<th className='text-center p-3'>Supplier</th>
					<th className='text-center p-3'>Number</th>
					<th className='text-center p-3'>Total</th>
				</tr>
			</thead>
			<tbody>{invoicesToDisplay}</tbody>
		</table>
	);
};

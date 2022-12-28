import { AddButton } from '../../components/Buttons/AddButton';
import { InvoiceDisplayType } from '../../types';

export const InvoiceHomeData = ({
	invoices,
	addInvoice,
	editInvoice,
}: {
	invoices: InvoiceDisplayType[];
	addInvoice: any;
	editInvoice: any;
}) => {
	const handleClick = (invoice: InvoiceDisplayType) => {
		editInvoice(invoice);
	};

	const invoicesToDisplay = invoices.map((invoice) => {
		return (
			<tr
				className='hover:bg-indigo-100'
				key={invoice.uuid}
				onClick={() => handleClick(invoice)}
			>
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

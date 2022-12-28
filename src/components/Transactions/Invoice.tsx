import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProjectsAndSuppliers } from '../../api/fetchProjectsAndSuppliers';
import { getRequest } from '../../api/getRequest';
import {
	BudgetItemType,
	DisplayStatusType,
	ErrorType,
	GetSuppliersType,
	ProjectType,
	StoreDataType,
} from '../../types';
import { AddButton } from '../Buttons/AddButton';
import { Loading } from '../Elements/Loading';
import { InvoiceFormData } from '../../helpers/Invoice';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { postRequest } from '../../api/postRequest';

type invoiceDisplayType = {
	uuid: string;
	invoice_number: string;
	date: string;
	total: number;
	project: ProjectType;
	supplier: GetSuppliersType;
};

export type saveInvoiceType = {
	project: string;
	supplier: string;
	invoice_number: string;
	date: string;
	total: number;
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
	const [selectedInvoice, setSelectedInvoice] =
		useState<invoiceDisplayType | null>(null);
	const storeData = useSelector((state: StoreDataType) => state);

	let invoices = useFetchInvoices(storeData, setIsLoading);

	const addInovice = () => setInfoToDisplay('add');

	const editInvoice = (invoice: invoiceDisplayType) => {
		setInfoToDisplay('edit');
		setSelectedInvoice(invoice);
	};

	const saveInvoice = () => {
		setInfoToDisplay('home');
	};

	const displayData = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<InvoiceHomeData
			invoices={invoices}
			addInvoice={addInovice}
			editInvoice={editInvoice}
		/>
	) : infoToDisplay === 'add' ? (
		<InvoiceAddData saveInvoice={saveInvoice} />
	) : (
		<InvoiceEditData
			saveInvoice={saveInvoice}
			selectedInvoice={selectedInvoice}
		/>
	);

	return displayData;
};

export { Invoice };

const InvoiceHomeData = ({
	invoices,
	addInvoice,
	editInvoice,
}: {
	invoices: invoiceDisplayType[];
	addInvoice: any;
	editInvoice: any;
}) => {
	const handleClick = (invoice: invoiceDisplayType) => {
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

const InvoiceAddData = ({ saveInvoice }: { saveInvoice: any }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
	const [error, setError] = useState<ErrorType | null>(null);
	const [addedInvoice, setAddedInvoice] = useState<saveInvoiceType>({
		project: '',
		supplier: '',
		invoice_number: '',
		date: '',
		total: 0,
	});
	const [displayAddDetail, setDisplayAddDetail] = useState<boolean>(false);
	const [invoice, setInvoice] = useState<invoiceDisplayType | null>(null);

	const storeData = useSelector((state: StoreDataType) => state);

	useEffect(() => {
		fetchProjectsAndSuppliers(
			storeData,
			setIsLoading,
			setProjects,
			setSuppliers
		).catch((err) => console.error(err));
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setError(null);
		setAddedInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const invoiceAddResponse = await postRequest(
				'/invoices',
				addedInvoice,
				{
					token: storeData.token,
					type: storeData.type,
				}
			);

			setInvoice(invoiceAddResponse.data.detail);
			setDisplayAddDetail(true);
		} catch (err: any) {
			if (err.response.status === 409)
				setError({
					errorKey: 'code',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
		}
	};

	const handleAddDetail = () => {};
	const handleClose = () => {
		saveInvoice();
	};

	const display = isLoading ? (
		<Loading />
	) : (
		<>
			<form onSubmit={handleSubmit}>
				<InvoiceFormData
					addedInvoice={addedInvoice}
					error={error}
					handleChange={handleChange}
					projects={projects}
					suppliers={suppliers}
				/>
				<div className='flex justify-between'>
					<div>
						<PrimaryButton
							buttonType={'submit'}
							text={'Submit'}
							onEvent={handleSubmit}
						/>
						<SecondaryButton
							buttonType={'button'}
							text={'Close'}
							onEvent={handleClose}
						/>
					</div>
					{displayAddDetail && (
						<PrimaryButton
							buttonType={'button'}
							text={'Add Detail'}
							onEvent={handleAddDetail}
						/>
					)}
				</div>
			</form>
			{displayAddDetail && <DisplayDetailData invoice={invoice} />}
		</>
	);

	return display;
};

const InvoiceEditData = ({
	saveInvoice,
	selectedInvoice,
}: {
	saveInvoice: any;
	selectedInvoice: invoiceDisplayType | null;
}) => {
	if (!selectedInvoice) return <h1>ERROR</h1>;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
	const [error, setError] = useState<ErrorType | null>(null);
	const [addedInvoice, setAddedInvoice] = useState<saveInvoiceType>({
		project: selectedInvoice.project.uuid,
		supplier: selectedInvoice.supplier.uuid,
		invoice_number: selectedInvoice.invoice_number,
		date: selectedInvoice.date,
		total: selectedInvoice.total,
	});

	const storeData = useSelector((state: StoreDataType) => state);

	useEffect(() => {
		fetchProjectsAndSuppliers(
			storeData,
			setIsLoading,
			setProjects,
			setSuppliers
		).catch((err) => console.error(err));
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleAddDetail = () => {};
	const handleClose = () => {
		saveInvoice();
	};

	const display = isLoading ? (
		<Loading />
	) : (
		<>
			<form onSubmit={handleSubmit}>
				<InvoiceFormData
					addedInvoice={addedInvoice}
					error={error}
					handleChange={undefined}
					projects={projects}
					suppliers={suppliers}
				/>
				<div className='flex justify-between'>
					<div>
						<PrimaryButton
							buttonType={'submit'}
							text={'Submit'}
							onEvent={handleSubmit}
						/>
						<SecondaryButton
							buttonType={'button'}
							text={'Close'}
							onEvent={handleClose}
						/>
					</div>
					<PrimaryButton
						buttonType={'button'}
						text={'Add Detail'}
						onEvent={handleAddDetail}
					/>
				</div>
			</form>
			<DisplayDetailData invoice={selectedInvoice} />
		</>
	);

	return display;
};

const fetchDetailData = async (
	storeData: StoreDataType,
	invoiceUuid: string,
	setIsLoading: any,
	setDetails: any
) => {
	const url = `/invoices/${invoiceUuid}/details`;
	setIsLoading(true);

	const detailsResponse = await getRequest(url, null, {
		token: storeData.token,
		type: storeData.type,
	});
	setDetails(detailsResponse.data.detail);

	setIsLoading(false);
};

type invoiceDetailType = {
	uuid: string;
	quantity: number;
	cost: number;
	total: number;
	budgetItem: BudgetItemType;
};

const DisplayDetailData = ({
	invoice,
}: {
	invoice: invoiceDisplayType | null;
}) => {
	if (!invoice) return <h1>ERROR</h1>;
	const [details, setDetails] = useState<invoiceDetailType[]>([]);
	const storeData = useSelector((state: StoreDataType) => state);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchDetailData(storeData, invoice.uuid, setIsLoading, setDetails);
	}, []);

	console.log(details);

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

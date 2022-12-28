import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	DisplayStatusType,
	StoreDataType,
	InvoiceDisplayType,
} from '../../types';
import { Loading } from '../Elements/Loading';
import { useFetchInvoices } from '../../hooks';
import {
	InvoiceHomeData,
	InvoiceAddData,
	InvoiceEditData,
} from '../../helpers/Invoice';

const Invoice = () => {
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedInvoice, setSelectedInvoice] =
		useState<InvoiceDisplayType | null>(null);
	const storeData = useSelector((state: StoreDataType) => state);

	let invoices = useFetchInvoices(storeData, setIsLoading);

	const addInovice = () => setInfoToDisplay('add');

	const editInvoice = (invoice: InvoiceDisplayType) => {
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

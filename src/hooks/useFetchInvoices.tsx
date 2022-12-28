import { useEffect, useState } from 'react';
import { StoreDataType, InvoiceDisplayType } from '../types';
import { getRequest } from '../api/connection';

export const useFetchInvoices = (
	storeData: StoreDataType,
	setIsLoading: any
) => {
	const [invoices, setInvoices] = useState<InvoiceDisplayType[]>([]);

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

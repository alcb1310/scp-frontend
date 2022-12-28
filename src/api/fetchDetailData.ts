import { getRequest } from './getRequest';
import { StoreDataType } from '../types';

export const fetchDetailData = async (
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

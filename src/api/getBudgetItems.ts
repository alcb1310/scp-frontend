import { getRequest } from './connection';
import { StoreDataType } from '../types';

export const getBudgetItems = (storeData: StoreDataType) => {
	return getRequest('/budget-items', null, {
		token: storeData.token,
		type: storeData.type,
	});
};

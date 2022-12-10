import {StoreDataType} from '../types'
import { getRequest } from './connection';

export const getSuppliers = (storeData: StoreDataType) => {
    return getRequest('/suppliers', null, {
		token: storeData.token,
		type: storeData.type,
	});
}
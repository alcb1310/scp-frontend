import { getRequest } from './connection';
import { StoreDataType } from '../types';

export const getProjects = (storeData: StoreDataType) => {
	return getRequest('/projects', null, {
		token: storeData.token,
		type: storeData.type,
	});
};

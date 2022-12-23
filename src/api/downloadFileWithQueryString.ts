import axios, { AxiosResponse } from 'axios';
import { BearerToken } from '../types';
import { queryParamsType } from '../types/queryParamsType';
import { SERVER } from './connection';

export const downloadFileWithQueryString = async (
	url: string,
	queryParameter: queryParamsType[],
	authorization: BearerToken
) => {
	const params = queryParameter.reduce(
		(allData, query: queryParamsType) => ({
			...allData,
			[query.key]: query.value,
		}),
		{}
	);

	const response: AxiosResponse = await axios({
		method: 'get',
		baseURL: SERVER,
		url,
		params,
		headers: {
			Authorization: authorization
				? `${authorization.type} ${authorization.token}`
				: null,
		},
		responseType: 'blob',
	});

	// console.log(response);

	const _url = window.URL.createObjectURL(response.data);
	window.open(_url, 'blank');

	await axios({
		method: 'delete',
		baseURL: SERVER,
		url,
		headers: {
			Authorization: authorization
				? `${authorization.type} ${authorization.token}`
				: null,
		},
	});
};

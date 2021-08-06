import { request } from '../index.js';

/**
 * 模拟API
 */

export async function requestSortList() {
	return await request('/sortList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export async function requestSortContent(index) {
	return await request('/sortList')
		.then((res) => res.json())
		.then(({ data }) => data[index].list)
		.catch((err) => {
			throw new Error(err);
		});
}

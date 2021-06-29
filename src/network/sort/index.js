import { request } from '../index.js';

export async function requestSortList() {
	return await request('/sortList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

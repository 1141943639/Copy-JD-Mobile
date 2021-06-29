import { request } from '../index.js';

export function requestGoodsList() {
	return request('/productGoodsList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}
